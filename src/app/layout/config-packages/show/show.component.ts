import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { PackageService } from './../../../services/config-packages/package.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Masks } from 'src/app/utils/masks';
import _ from 'lodash';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
declare var $;
const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [routerTransition()]
})

export class ShowComponent implements OnInit {
  service: Object;
  packageForm: FormGroup;
  loading = false;
  services: any = [];
  userExternal = false;
  ocrValue = false;
  sgnValue = true;
  id = localStorage.getItem('idPackage');
  permissionConfirmEdit = false;
  permissionCancelEdit = false;
  permissionEdit = false;
  permissionDelete = false;
  isEditing = false;

  constructor(
    private _route: Router,
    private mask: Masks,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private packageSrv: PackageService,
    private introService: IntroJsService,
    private activeModal: NgbActiveModal,
    private route: ActivatedRoute,
    private modalService: NgbModal,
  ) {
    this.packageForm = this.fb.group({
      _id: this.fb.control(''),
      labelPackage: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      describe: this.fb.control({ value: '', disabled: true }),
      filesPackage: this.fb.control({ value: '', disabled: true }),
      pagesPackage: this.fb.control({ value: '', disabled: true }),
      price: this.fb.control({ value: '', disabled: true }),
      signature: this.fb.control({ value: '', disabled: true }),
      ocr: this.fb.control({ value: '', disabled: true })
    });
  }

  ngOnInit() {
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    this.getPackage();
  }

  get labelPackage() {
    return this.packageForm.get('labelPackage');
  }

  ocrChange(event) {
    this.ocrValue = event;
  }

  signiatureChange(event) {
    this.sgnValue = event;
  }

  getPackage() {
    this.loading = true;
    this.packageSrv.getPackage(this.id).subscribe(
      data => {
        const packageData = data;
        this.packageForm.patchValue({
          _id: packageData._id,
          labelPackage: packageData.labelPackage,
          describe: packageData.describe,
          filesPackage: packageData.filesPackage,
          pagesPackage: packageData.pagesPackage,
          price: packageData.price,
          signature: packageData.signature,
          ocr: packageData.ocr
        });
        this.ocrValue = packageData.ocr;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
      }
    );
  }

  help() {
    this.introService.NewMenuServices();
  }

  close() {
    this.activeModal.close('Sair');
  }

  open(name: string, id) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = id;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Pacote foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Pacote?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao Pacote serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  delete(packageId) {
    this.loading = true;
    this.packageSrv.deletePackage(packageId).subscribe(
      response => {
        this.close();
        this.loading = false;
        this.successMsgSrv.successMessages('Pacote deletado com sucesso.');
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  editPackage() {
    this.isEditing = true;
    this.enableDisable(1);
    this.permissionDelete = false;
    this.permissionEdit = false;
    this.permissionCancelEdit = true;
    this.permissionConfirmEdit = true;
  }

  cancelEdit() {
    this.enableDisable(0);
    this.getPackage();
    this.isEditing = false;
    this.permissionDelete = true;
    this.permissionEdit = true;
    this.permissionCancelEdit = false;
    this.permissionConfirmEdit = false;
  }

  enableDisable(type) {
    if (type == 1) {
      this.packageForm.controls['labelPackage'].enable();
      this.packageForm.controls['describe'].enable();
      this.packageForm.controls['filesPackage'].enable();
      this.packageForm.controls['pagesPackage'].enable();
      this.packageForm.controls['price'].enable();
      this.packageForm.controls['signature'].enable();
      this.packageForm.controls['ocr'].enable();
    } else {
      this.packageForm.controls['labelPackage'].disable();
      this.packageForm.controls['describe'].disable();
      this.packageForm.controls['filesPackage'].disable();
      this.packageForm.controls['pagesPackage'].disable();
      this.packageForm.controls['price'].disable();
      this.packageForm.controls['signature'].disable();
      this.packageForm.controls['ocr'].disable();
    }
  }

  submit() {
    this.loading = true;
    const pack = _.omitBy(this.packageForm.value, _.isNil);
    console.log(pack);
    this.packageSrv.updatePackage(pack).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Pacote alterado com sucesso.');
          this.isEditing = false;
          this.enableDisable(0);
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
