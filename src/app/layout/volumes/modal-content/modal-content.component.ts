import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { Volume } from 'src/app/models/volume';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { routerTransition } from 'src/app/router.animations';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';

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
  @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
  @ViewChild('instanceDepartament') instanceDepartament: NgbTypeahead;
  
  @Input() public vol;
  id;

  loading: Boolean = false;
  volume: Volume;
  volumeForm: FormGroup;
  statusList: any = [];
  storeHouses: any = [];
  volumeTypeList: any = [];
  guardTypeList: any = [];
  departaments: any = [];
  companies: any = [];

  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirm: boolean = false;
  permissionCancel: boolean = false;
  inputBlock: Boolean = false;
  isEditing: boolean = false;
  isUsers = false;
  isNew: Boolean = false;
  hiddenReference: Boolean = true;
  
  focusCompany$ = new Subject<string>();
  clickCompany$ = new Subject<string>();
  focusDepartament$ = new Subject<string>();
  clickDepartament$ = new Subject<string>();
  focusStorehouse$ = new Subject<string>();
  clickStorehouse$ = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private warningMsg: WarningMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    private volumesSrv: VolumesService,
    private departamentsSrv: DepartamentsService,
    private companiesSrv: CompaniesService,
    private storeHousesSrv: StorehousesService,
    private utilCase: CaseInsensitive,
  ) { 
    this.statusList = StatusVolumeEnum;
    this.volumeTypeList = VolumeTypeEnum;
    this.guardTypeList = GuardyTypeVolumeEnum;

    this.volumeForm = this.fb.group({
      storehouse: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      guardType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      volumeType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      departament: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      uniqueField: this.fb.control(''),
      location: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      reference: this.fb.control({ value: '', disabled: true }),
      closeBox: this.fb.control({value: '', disabled: true}),
      status: this.fb.control({value: 'ATIVO', disabled: true}),
    });
  }

  ngOnInit() {
    this.getCompanies();
    this.getStoreHouses();

    if (this.vol) {
      console.log('O COELHINHO TROUXE: ', this.vol);
      this.id = this.vol._id;
      this.getVolume();
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
      this.isUsers = JSON.parse(localStorage.getItem('userExternal'));
    } else {
      this.isNew = true;
      this.permissionCancel = true;
      this.permissionConfirm = true;    
      this.enableDisable(1); 
    } 
  }

  enableDisable(execution) {
    if (execution == 1) {
      this.volumeForm.controls['storehouse'].enable();
      this.volumeForm.controls['departament'].enable();
      this.volumeForm.controls['company'].enable();
      this.volumeForm.controls['guardType'].enable();
      this.volumeForm.controls['volumeType'].enable();
      this.volumeForm.controls['location'].enable();
      this.volumeForm.controls['closeBox'].enable();
    }
  }

  get location() {
    return this.volumeForm.get('location');
  }
  get volumeType() {
      return this.volumeForm.get('volumeType');
  }
  get guardType() {
      return this.volumeForm.get('guardType');
  }
  get companyIpt() {
      return this.volumeForm.get('company');
  }
  get storehouse() {
      return this.volumeForm.get('storehouse');
  }
  get reference() {
      return this.volumeForm.get('reference');
  }
  get departament() {
      return this.volumeForm.get('departament');
  }
  get records() {
      console.log(this.records);
      return this.volumeForm.get('records');
  }
  
  get company() {
    return this.volumeForm.get('company');
  }

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
        data => {
            this.companies = data.items;
        },
        error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        }
    );
  }

  getStoreHouses() {
    this.storeHousesSrv.searchStorehouses().subscribe(
        data => {
            this.loading = false;
            this.storeHouses = data.items;
        },
        error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        }
    );
  }

  getVolume(){
    this.volumesSrv.volume(this.id).subscribe(
      data => {
          this.loading = false;
          this.volume = data;
          this.volumeForm.patchValue({
              _id: this.volume._id,
              departament: this.volume.departament,
              storehouse: this.volume.storehouse,
              company: data.company,
              guardType: data.guardType,
              volumeType: data.volumeType,
              uniqueField: data.uniqueField,
              location: data.location,
              status: data.status,
              reference: data.reference,
              closeBox: data.closeBox,
          });
          // this.getDepartament(data.company._id);
      },
      error => {
          this.loading = false;
          this.errorMsg.errorMessages(error);
          console.log('ERROR', error);
      }
    );
  }

  changeGuardType() {
    switch (this.volumeForm.value.guardType) {
        case 'SIMPLES':
            this.hiddenReference = false;
            break;
        case 'GERENCIADA':
            this.hiddenReference = true;
            break;
    }
  }

  search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(storehouse =>
                storehouse.length < 2
                    ? []
                    : _.filter(this.storeHouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10)
            )
        )

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickCompany$.pipe(filter(() => !this.instanceCompany.isPopupOpen()));
    const inputFocus$ = this.focusCompany$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(company => {
            let res = [];
            if (company.length < 0) {
                [];
            } else {
                res = _.filter(this.companies,
                    v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
            }
            return res;
        })
    );
  }

  selectedCompany(e) {
    if (e && e.item && e.item._id) {
      this.getDepartament(e.item._id);
    } else {
      this.getDepartament(e);
    }
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
                res = _.filter(this.storeHouses,
                    v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10);
            }
            return res;
        }));
  }

  searchDepartament = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickDepartament$.pipe(filter(() => !this.instanceDepartament.isPopupOpen()));
    const inputFocus$ = this.focusDepartament$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(departament => (departament === '' ? this.departaments
            : _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10)
        )));
  }

  
  getDepartament(id) {
    this.departamentsSrv.searchDepartaments(id).subscribe(
      data => {
        this.departaments = data.items;
        console.log('departaments', this.departaments);
        if (this.departaments.length <= 0) {
          this.warningMsg.showWarning('Por favor, adicione um departamento a essa empresa antes de criar um volume!', 3000);
        }
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  returnId(object) {
    this.volumeForm.value[object] = _.filter(this.volumeForm.value[object], function (value, key) {
        if (key === '_id') { return value; }
    })[0];
  }

  returnUniqField() {
    return `${this.volumeForm.value.location}-${this.volumeForm.value.company}`;
  }

  blockInputs(){
    !this.inputBlock ? (this.inputBlock = true) : (this.inputBlock = false);
  }

  resetInputs() {
    if (this.inputBlock) {
        this.volumeForm.patchValue({
            location: '',
            reference: null
        });
        this.volumeForm.controls.location.setValidators([Validators.required]);
    } else {
        this.volumeForm.reset();
    }
  }

  close() {
    if (this.isNew) {
      this.activeModal.close('Novo');
    } else {
      this.activeModal.close('Sair');
    }
  }

  help() {
    if (this.isNew) {
      this.introService.NewVolume();
    } else if (!this.isNew && this.isEditing) {
      this.introService.EditVolumes();
    } else {
      this.introService.ShowVolumes();
    }
  }

  // EDIT

  editVolume() {
    console.log("ESTOU NO EDIT");
    this.permissionDelete = false;
    this.permissionEdit = false;
    this.permissionCancel = true;
    this.permissionConfirm = true;
    this.isEditing = true;
    this.volumeForm.controls['location'].enable();
    this.volumeForm.controls['closeBox'].enable();
  }

  cancelEditNew() {
    if (this.isNew) {
      this.activeModal.close('Sair');
    } else {
      this.volumeForm.controls['location'].disable();
      this.volumeForm.controls['closeBox'].disable();
      this.getVolume();
      this.permissionDelete = true;
      this.permissionEdit = true;
      this.permissionCancel = false;
      this.permissionConfirm = false;
      this.isEditing = false;

    }
  }

  // DELETE

  open(name: string, id) {
    const modalRef = this.modalService.open(MODALS[name]);
      modalRef.componentInstance.item = id;
      modalRef.componentInstance.data = {
        msgConfirmDelete: 'Volume foi deletado com sucesso.',
        msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Volume?',
        msgQuestionDeleteTwo: 'Todas as informações associadas ao volume serão deletadas.'
      };
      modalRef.componentInstance.delete.subscribe(item => {
        this.delete(item);
      });
  }
  
  delete(id) {
    this.loading = true;
    this.volumesSrv.deleteVolume(id).subscribe(
      response => {
          this.successMsgSrv.successMessages('Volume deletado com sucesso.');
          this.activeModal.close('Novo');
      },
      error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR:', error);
      }
    );
  }

  // FINALIZAÇÃO

  submit(){
    if (!this.isNew && this.isEditing) {
      // this.loading = true;
      this.returnId('company');
      this.returnId('storehouse');

      // this.volumeForm.value.uniqueField = this.returnUniqField();
      const volumeForm = _.omitBy(this.volumeForm.value, _.isNil);
      volumeForm._id = this.id;

      this.volumesSrv.updateVolume(volumeForm).subscribe(
        data => {
          if (data._id) {
            this.loading = false;
            this.successMsgSrv.successMessages('Volume cadastrado com sucesso.');
            this.activeModal.close('Editar');
          }
        },
        error => {
          this.loading = false;
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
        }
      );
    } else {
      this.returnId('company');
      this.returnId('storehouse');
      this.returnId('departament');
      this.volumeForm.value.uniqueField = this.returnUniqField();
      const volume = _.omitBy(this.volumeForm.value, _.isNil);
      this.volumesSrv.newVolume(volume).subscribe(
          data => {
              if (data._id) {
                  this.successMsgSrv.successMessages('Volume cadastrado com sucesso.');
                  this.resetInputs();
              }
          },
          error => {
              this.errorMsg.errorMessages(error);
              console.log('ERROR: ', error);
          }
      );
    }
  }
}
