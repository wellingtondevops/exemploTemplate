import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Archive } from 'src/app/models/archive';
import { routerTransition } from 'src/app/router.animations';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import * as moment from 'moment';
import { PicturesService } from 'src/app/services/pictures/pictures.service';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit{
  @Input() public arch;
  id;

  loading: Boolean = false;
  isEditing: Boolean = false;
  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirm: boolean = false;
  permissionCancel: boolean = false;
  isUsers = false;
  savedFile = false;
  pdfHeight = '100vh;'

  uploadResponse: any = { status: 'progress', message: 0 };
  errorUpload: boolean = null;
  file: any = '';
  height = 0;
  pending: Boolean;
  archiveCreateForm: FormGroup;
  requestForm: FormGroup;
  startCurrentDate = false;
  inputStartCurrentDate = '';

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
  ) { }

  // INICIALIZAÇÃO

  ngOnInit() {
    this.pdfHeight = ($(window).width() > 991) ? '70vh' : '65vh';
    console.log('AQUI TELA: ', $(window).width());
    console.log('AQUI Pdf HEIGHT: ', this.pdfHeight);
    // console.log('TO DENTRO COM ISSO: ', this.arch);
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
    this.getArquive();
  }

  // RESOURCES

  beforeChange(data){}

  getArquive() {
    this.loading = true;
    this.archiveSrv.archive(this.id).subscribe(data => {
        this.archive = data;
        this.pending = data.pending;
        this.archiveCreateForm.patchValue({
            create: moment(data.create).format('DD/MM/YYYY hh:mm'),
            indexBy: data.author && data.author.email ? data.author.email : 'Sem e-mail'
        });
        this.file = data.picture;
        $('.file').css('height', 'auto');
        this.loading = false;
    }, error => {
        $('.file').css('height', this.height - 30);
        console.log('ERROR: ', error);
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

  setStartCurrentDate(){
    const data = { startCurrentDate: moment(this.inputStartCurrentDate).format('DD/MM/YYYY') };
        this.loading = true;
        this.archiveSrv.patchStartCurrentDate(this.id, data).subscribe(res => {
            this.getArquive();
            this.loading = false;
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR ', error);
        });
  }

  returnDateCreate(create) {
    return moment(create).format('DD/MM/YYYY hh:mm');
  }

  returnDate(create) {
      return moment(create).format('DD/MM/YYYY');
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

  startEdit(execution) {
    this.isEditing = execution;
    this.permissionConfirm = execution;
    this.permissionCancel = execution;
    this.permissionEdit = !execution;
    this.permissionDelete = !execution;
  }

  editArchive() {
    this.startEdit(true);
  }

  cancelEdit() {
    this.startEdit(false);
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
        console.log(error);
        this.errorMsg.errorMessages(error);
    });
  }

  // FINALIZAÇÃO

  sendRequest(){
    this.loading = true;
        this.archiveSrv.sendRequest(this.id ,this.requestForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Solicitação cadastrado com sucesso.');
                this.ngOnInit();

            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );


  }

  FimRequest(){
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
                console.log('ERROR: ', error);
            }
        );
  }

  submit(){}
}
