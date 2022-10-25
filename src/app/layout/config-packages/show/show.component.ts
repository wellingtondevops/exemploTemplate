import { PackageService } from './../../../services/config-packages/package.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Masks } from 'src/app/utils/masks';

import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
  service: Object;
  packageForm: FormGroup;
  loading: Boolean = false;
  services: any = [];
  userExternal = false;
  ocrValue = false;
  sgnValue = true;
  id = localStorage.getItem('idPackage');
  permissionEdit = false;
  permissionDelete = false;

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
  ) {
  }

  ngOnInit() {
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    this. getPackage();
    this.packageForm = this.fb.group({
      _id: this.fb.control({ value: '', disabled: true }),
      labelPackage: this.fb.control({ value: '', disabled: true }),
      describe: this.fb.control({ value: '', disabled: true }),
      filesPackage: this.fb.control({ value: '', disabled: true }),
      pagesPackage: this.fb.control({ value: '', disabled: true }),
      price: this.fb.control({ value: '', disabled: true }),
      signature: this.fb.control({ value: '', disabled: true }),
      ocr: this.fb.control({ value: '', disabled: true })
    });

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
  
}
