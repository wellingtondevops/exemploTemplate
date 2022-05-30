import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Volume } from 'src/app/models/volume';
import { routerTransition } from 'src/app/router.animations';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';



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
  isNew: Boolean = false;

  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirmEdit: boolean = false;
  permissionCancelEdit: boolean = false;
  isUsers = false;

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    private volumesSrv: VolumesService,
  ) { 
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

  enableDisable(type) {

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
    this.enableDisable(1);
    this.permissionDelete = false;
    this.permissionEdit = false;
    this.permissionCancelEdit = true;
    this.permissionConfirmEdit = true;
  }

  cancelEditNew() {
    if (this.isNew) {
      this.activeModal.close('Sair');
    } else {
      this.enableDisable(0);
      this.getVolume();
      this.permissionDelete = true;
      this.permissionEdit = true;
      this.permissionCancelEdit = false;
      this.permissionConfirmEdit = false;
    }
  }

  // DELETE

  open(name: string, id) {

  }
  
  delete(id) {
    this.loading = true;
  }

  // FINALIZAÇÃO

  submit(execution: string){
    if (!this.isNew) {
      this.loading = true;
    } else {
      this.loading = true;
    }
  }
}
