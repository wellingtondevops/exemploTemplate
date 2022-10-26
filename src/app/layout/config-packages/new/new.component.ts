import { PackageService } from './../../../services/config-packages/package.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Masks } from 'src/app/utils/masks';

import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  service: Object;
  packageForm: FormGroup;
  loading: Boolean = false;
  services: any = [];
  userExternal = false;
  ocrValue = false;
  sgnValue = true;

  constructor(
    private _route: Router,
    private mask: Masks,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private packageSrv: PackageService,
    private introService: IntroJsService,
    private activeModal: NgbActiveModal,
  ) {
  }

  ngOnInit() {
    this.packageForm = this.fb.group({
      labelPackage: this.fb.control('', [Validators.required]),
      describe: this.fb.control(''),
      filesPackage: this.fb.control(''),
      pagesPackage: this.fb.control(''),
      price: this.fb.control(''),
      signature: this.fb.control(true),
      ocr: this.fb.control(false)
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

  postPackage() {
    this.loading = true;
    this.returnFormatPrice();
    this.packageSrv.newPackage(this.packageForm.value).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Pacote cadastrado com sucesso.');
          this.close();
          this._route.navigate(['/package']);
        }
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

  returnFormatPrice() {
    let priceStr = this.packageForm.get('price').value;
    priceStr.replace(',', '.');
    priceStr = priceStr.replace('R$', '');
    const priceFloat = parseFloat(priceStr);
    this.packageForm.patchValue({
      price: priceFloat})
  }
}
