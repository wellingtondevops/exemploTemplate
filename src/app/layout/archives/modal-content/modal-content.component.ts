import { SaveLocal } from 'src/app/storage/saveLocal';
import { ObjNew, objList } from './../../../models/newObjModel';
import { CaseInsensitive } from './../../../utils/case-insensitive';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Subject, Observable, merge } from 'rxjs';
import { Page } from './../../../models/page';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Archive } from 'src/app/models/archive';
import { routerTransition } from 'src/app/router.animations';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import * as moment from 'moment';
import { PicturesService } from 'src/app/services/pictures/pictures.service';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import _ from 'lodash';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit {
  @ViewChild('instanceStorehouse',) instanceStorehouse: NgbTypeahead;
  @Input() public arch;
  id;
  select = 0;
  page = new Page();
  loading: Boolean = false;
  isEditing: Boolean = false;
  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirm: boolean = false;
  permissionCancel: boolean = false;
  isUsers = false;
  savedFile = false;
  pdfHeight = '100vh;'
  document: any;
  storehouses: any;
  focusStorehouse$ = new Subject<string>();
  clickStorehouse$ = new Subject<string>();
  locations: objList = {
    _links: {
      currentPage: 0,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };

  uploadResponse: any = { status: 'progress', message: 0 };
  errorUpload: boolean = null;
  file: any = '';
  height = 0;
  pending: Boolean;
  archiveCreateForm: FormGroup;
  requestForm: FormGroup;
  newSeachrForm: FormGroup;
  startCurrentDate = false;
  inputStartCurrentDate = '';
  companyName;
  deptName;

  archive: Archive;

  uploadFile = new FormGroup({
    storehouse: new FormControl(''),
    volume: new FormControl(''),
    company: new FormControl(''),
    archive: new FormControl(''),
    doct: new FormControl(''),
    file: new FormControl(null, [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    private archiveSrv: ArquivesService,
    private picturesSrv: PicturesService,
    private utilCase: CaseInsensitive,
    private localStorageSrv: SaveLocal,
  ) { }

  // INICIALIZAÇÃO

  ngOnInit() {
    this.pdfHeight = ($(window).width() > 991) ? '70vh' : '65vh';

    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
    this.startCurrentDate = JSON.parse(window.localStorage.getItem('routes'))[0].startcurrentdate;

    this.isUsers = JSON.parse(localStorage.getItem('userExternal'));
    this.id = this.arch._id;
    this.archiveCreateForm = this.fb.group({
      create: this.fb.control(''),
      indexBy: this.fb.control('')
    });
    this.requestForm = this.fb.group({
      requestType: this.fb.control(''),
      notes: this.fb.control('')
    });

    this.newSeachrForm = this.fb.group({
      location: this.fb.control(''),
      storehouse: this.fb.control('', Validators.required)
    })

    this.getArchive();
    this.getStoreHouses();
  }

  // RESOURCES

  beforeChange(data) {
    if (data.nextId === 'tab3') {
      this.select = 1;
    } else {
      this.select = 0;
    }
  }

  getArchive() {
    this.loading = true;
    this.archiveSrv.archive(this.id).subscribe(data => {
      this.archive = data;
      this.pending = data.pending;
      this.document = data.doct;
      this.companyName = data.company.name;
      this.deptName = data.departament.name;
      this.archiveCreateForm.patchValue({
        create: moment(data.create).format('DD/MM/YYYY hh:mm'),
        indexBy: data.author && data.author.email ? data.author.email : 'Sem e-mail'
      });
      this.file = data.picture;
      $('.file').css('height', 'auto');
      this.loading = false;
    }, error => {
      $('.file').css('height', this.height - 30);
      this.loading = false;
    });
  }

  close() {
    this.activeModal.close('Sair');
  }

  help() {
    if (this.isEditing) {
      this.introService.EditArchives();
    } else {
      this.introService.ShowArchives();
    }
  }

  setStartCurrentDate() {
    const data = { startCurrentDate: moment(this.inputStartCurrentDate).utc().format('DD/MM/YYYY') };
    this.loading = true;
    this.archiveSrv.patchStartCurrentDate(this.id, data).subscribe(res => {
      this.getArchive();
      this.loading = false;
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
    });
  }

  returnDateCreate(create) {
    return moment(create).utc().format('DD/MM/YYYY hh:mm');
  }

  returnDate(create) {
    return moment(create).utc().format('DD/MM/YYYY');
  }

  postFile(data) {
    this.uploadFile.patchValue({
      archive: this.archive._id,
      volume: this.archive.volume._id,
      company: this.archive.company._id,
      storehouse: this.archive.storehouse._id,
      doct: this.archive.doct._id,
      file: data
    });
    this.submit();
  }

  //  resizeFile(){
  //   $('.file').css('height', this.height - 30);
  //  }

  // EDIT

  updateArchive(data) {
    this.loading = true;
    /* const storehouse = this.storeHouse_id;
    const doct = this.document._id;
    const company = this.company_id; */
    const tag = _.values(data);
    let uniqueness = '';
    const labelsTrueLength = _.filter(this.document.label, ['uniq', true]);
    this.document.label.map((label, i) => {
      if (label.uniq) {
        if (i === (labelsTrueLength.length - 1)) {
          uniqueness += `${tag[i]}`;
        } else {
          uniqueness += `${tag[i]}-`;
        }
      }
    });
    this.archiveSrv.updateArchive(this.id, { tag, uniqueness }).subscribe(data => {
      if (data._id) {
        this.loading = false;
        this.successMsgSrv.successMessages('Arquivo alterado com sucesso.');
        this.cancelEdit();
      }
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
    });
  }

  startEdit(execution) {
    this.isEditing = execution;
    this.permissionConfirm = execution;
    this.permissionCancel = execution;
    this.permissionEdit = !execution;
    this.permissionDelete = !execution;

    return this.isEditing;
  }

  editArchive() {
    this.startEdit(true);
    this.getArchive();
  }

  cancelEdit() {
    this.startEdit(false);
    this.getArchive();
  }

  // DELETE

  open(name, id) {
    const modalRef = this.modalService.open(MODALS[name], {
      keyboard: false, backdrop: 'static', windowClass: 'modal-style',
    });
    modalRef.componentInstance.item = id;
    modalRef.componentInstance.data = {
      titleModal: 'Deletar Arquivo',
      msgConfirmDelete: 'Arquivo foi deletada com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o arquivo?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao arquivo serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  delete(file) {
    this.archiveSrv.delete(this.id, this.archive).subscribe(res => {
      this.successMsgSrv.successMessages('Arquivo deletado com sucesso.');
      this.file = null;
      this.archive = null;
      this.activeModal.close('Delete');
    }, error => {
      this.errorMsg.errorMessages(error);
    });
  }

  // FINALIZAÇÃO

  sendRequest() {
    this.loading = true;
    this.archiveSrv.sendRequest(this.id, this.requestForm.value).subscribe(
      data => {
        this.loading = false;
        this.successMsgSrv.successMessages('Solicitação cadastrado com sucesso.');
        this.ngOnInit();
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
      }
    );
  }

  FimRequest() {
    this.loading = true;
    this.archiveSrv.finalRequest(this.id).subscribe(
      data => {
        this.loading = false;
        this.successMsgSrv.successMessages('Solicitação Finalizada com sucesso.');
        this.ngOnInit();
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
      }
    );
  }

  submit() { }

  get storehouseIpt() {
    return this.newSeachrForm.get('storehouse');
  }

  returnId(object) {
    const result = _.filter(this.newSeachrForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
    return result;
  }

  searchPosition() {
    this.setPage({ offset: 0 });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    const newSearch = {
      storehouse: null,
      location: null,
    };

    newSearch.location = this.newSeachrForm.value.storehouse;
    newSearch.location = this.newSeachrForm.value.location;

    const searchValue = _.omitBy(newSearch, _.isNil);

    this.archiveSrv.getNewSearch(this.id, this.newSeachrForm.value, this.page).subscribe(
      data => {
        this.page.pageNumber = data._links.currentPage - 1;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.page.size = data._links.totalPage;
        this.locations = data;
      },
      error => {
        this.errorMsg.errorMessages(error);
      }
    );
  }

  getStoreHouses() {
    this.archiveSrv.searchStorehousesNoVirtual().subscribe(
      data => {
        this.storehouses = data.items;
        console.log(data.items)
      },
      error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    );
  }

  searchStorehouse = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickStorehouse$.pipe(filter(() => !this.instanceStorehouse.isPopupOpen()));
    const inputFocus$ = this.focusStorehouse$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(storehouse => {
        let res = [];
        if (storehouse.length < 0) {
          [];
        } else {
          res = _.filter(this.storehouses,
            v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10);
        }
        return res;
      }));
  }

  formatter = (x: { name: string }) => x.name;

  clear() {
    this.newSeachrForm.patchValue({
      location: '',
      storehouse: '',
    });
  }
}
