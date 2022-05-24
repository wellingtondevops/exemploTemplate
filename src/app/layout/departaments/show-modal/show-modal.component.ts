import { Component, ComponentRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Departament } from 'src/app/models/departament';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  animations: [routerTransition()]

})
export class ShowModalComponent implements OnInit  {
  @Input() public data;

  depCreateForm: FormGroup;
  modalOptions:NgbModalOptions;
  loading: Boolean = false;
  height = 0;
  id: string;
  startCurrentDate = false;
  isUsers = false;
  departament: Departament;
  closeResult: string;

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private route: ActivatedRoute,
    private depService: DepartamentsService,
    private introService: IntroJsService,
    private modalService: NgbModal,
    ) {

      this.modalOptions = {
        backdrop: 'static',
        backdropClass: 'customBackdrop',
        keyboard: false,
        windowClass: 'customModal'
      };

    }

  ngOnInit() {
    this.depCreateForm = this.fb.group({
      create: this.fb.control(''),
      indexBy: this.fb.control('')
    });
    this.height = $('nav.sidebar').height();
    this.id = this.data._id;
    this.startCurrentDate = JSON.parse(window.localStorage.getItem('routes'))[0].startcurrentdate;
    this.isUsers = JSON.parse(localStorage.getItem('userExternal'));
    this.getDepartament();
  }



  closeModel() {
    console.log("Parei no fechar");
  }
 
  getDepartament() {
    this.loading = true;
    this.depService.departament(this.id).subscribe(data => {
      this.departament = data;
      console.log("DATA DO MODAL: ", this.departament);
      this.depCreateForm.patchValue({
        create: moment(data.dateCreated).format('DD/MM/YYYY hh:mm'),
        // indexBy: data.author && data.author.mailSignup ? data.author.mailSignup : 'Sem e-mail'
      });
      // this.file = data.picture;
      $('.file').css('height', 'auto');
      this.loading = false;
    }, error => {
      // $('.file').css('height', this.height - 30);
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  returnDateCreate(create) {

  }

  returnDate(create) {

  }

  setStartCurrentDate() {

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

  help() {
    this.introService.ShowDepartment();
}
}