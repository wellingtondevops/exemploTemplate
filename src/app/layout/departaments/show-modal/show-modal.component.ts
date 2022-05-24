import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  animations: [routerTransition()]

})
export class ShowModalComponent implements OnInit {
  @Input() public data;


  modalOptions:NgbModalOptions;
  loading: Boolean = true;



  constructor(

    ) {

      this.modalOptions = {
        backdrop: 'static',
        backdropClass: 'customBackdrop',
        keyboard: false,
        windowClass: 'customModal'
      };

    }

  ngOnInit() {
    console.log(this.data);

  }

  returnDateCreate(create) {

  }

  returnDate(create) {

  }

  setStartCurrentDate() {

  }

  getArquive() {
  
  }

  mapLabel(labels, tags) { // VERIFICAR

  }

  submit() {
  
  }

  open(name: string, file) { // VERIFICAR

  }

  delete(file) {

  }

  edit(departament) {
  }
}