import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
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
  permissionConfirmEdit: boolean = false;
  permissionCancelEdit: boolean = false;
  isUsers = false;
  isNew: Boolean = false;
  hiddenReference: Boolean = true;
  

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    private volumesSrv: VolumesService,
    private departamentsSrv: DepartamentsService,
  ) { 
    this.statusList = StatusVolumeEnum;
    this.volumeTypeList = VolumeTypeEnum;
    this.guardTypeList = GuardyTypeVolumeEnum;

    this.volumeForm = this.fb.group({
      _id: this.fb.control(''),
      storehouse: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      guardType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      volumeType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      departament: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      uniqueField: this.fb.control(''),
      status: this.fb.control({ value: '', disabled: true }),
      location: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      reference: this.fb.control({ value: '', disabled: true }),
      closeBox: this.fb.control({value: '', disabled: true})
    });
  }

  ngOnInit() {
    if (this.vol) {
      console.log('O COELHINHO TROUXE: ', this.vol);
      this.id = this.vol._id;
      this.getVolume();
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
      this.isUsers = JSON.parse(localStorage.getItem('userExternal'));
    } else {
      this.isNew = true;
      this.permissionCancelEdit = true;
      this.permissionConfirmEdit = true;    
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
      this.volumeForm.controls['status'].enable();
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

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                let res;
                if (company.length < 2) {
                    [];
                } else {
                    const res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
                }
                this.getDepartament(this.volumeForm.value.company._id);
                return res;
            })
        )

    searchDepartament = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(departament =>
                departament.length < 2
                    ? []
                    : _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10)
            )
        )

  
  getDepartament(id) {
    this.departamentsSrv.searchDepartaments(id).subscribe(
      data => {
        console.log('departaments', data);
        this.departaments = data.items;
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


  close() {
    this.activeModal.close('Sair');
  }

  help() {
    if (this.isNew) {
      this.introService.NewVolume();
    } else if (!this.isNew && this.permissionCancelEdit) {
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
    this.permissionCancelEdit = true;
    this.permissionConfirmEdit = true;
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
      this.permissionCancelEdit = false;
      this.permissionConfirmEdit = false;
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

  submit(execution: string){
    if (!this.isNew) {
      this.loading = true;
    } else {
      this.loading = true;
      this.returnId('company');
      this.returnId('storehouse');

    this.volumeForm.value.uniqueField = this.returnUniqField();
      console.log(this.volumeForm.value);
      const volumeForm = _.omitBy(this.volumeForm.value, _.isNil);
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
    }
  }
}
