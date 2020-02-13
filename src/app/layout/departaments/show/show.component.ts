import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Company } from 'src/app/models/company';
import { Departament } from 'src/app/models/departament';
import _ from 'lodash';
import * as moment from 'moment';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  companies: any = [];
  departamentForm: FormGroup;
  company: Company;
  storeHouses: any = [];
  departaments: any = [];
  statusList: any = [];
  id: String;
  departament: Departament;
  changeUp = false;
  hiddenReference: Boolean = true;
  public loading: Boolean = false;

  constructor(
      private route: ActivatedRoute,
      private departamentsSrv: DepartamentsService,
      private companiesSrv: CompaniesService,
      private successMsgSrv: SuccessMessagesService,
      private errorMsg: ErrorMessagesService,
      private fb: FormBuilder,
      private modalService: NgbModal,
      public modal: NgbActiveModal,
      private _route: Router
  ) {
      this.departamentForm = this.fb.group({
          _id: this.fb.control(''),
          company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
          name: this.fb.control({ value: '', disabled: true }, [Validators.required])
      });
  }

  ngOnInit() {
      this.getCompanies();
      this.loading = true;
      this.id = this.route.snapshot.paramMap.get('id');
      this.getDepartament();
  }

  get companyIpt() {
      return this.departamentForm.get('company');
  }
  get name() {
      return this.departamentForm.get('name');
  }

  getDepartament() {
      this.departamentsSrv.departament(this.id).subscribe(
          data => {
              this.loading = false;
              this.departament = data;
              this.departamentForm.patchValue({
                  _id: this.departament._id,
                  company: data.company,
                  name: data.name
              });
          },
          error => {
              this.loading = false;
              this.errorMsg.errorMessages(error);
              console.log('ERROR', error);
          }
      );
  }

  changeUpdate() {
      !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
      if (this.changeUp) {
          this.departamentForm.reset({
              _id: this.departament._id,
              company: { value: this.departament.company, disabled: false },
              name: { value: this.departament.name, disabled: false },
              dateCreated: { value: moment(this.departament.dateCreated).format('YYYY-MM-DD'), disabled: true }
          });
      }
  }

  getCompanies() {
      this.companiesSrv.companies(null).subscribe(
          data => {
              this.companies = data.items;
          },
          error => {
              this.errorMsg.errorMessages(error);
              console.log('ERROR: ', error);
          }
      );
  }


  returnId(object) {
      this.departamentForm.value[object] = _.filter(this.departamentForm.value[object], function(value, key) {
          if (key === '_id') {
              return value;
          }
      })[0];
  }

  updateDepartament() {
      this.returnId('company');
      this.departamentsSrv.update(this.departamentForm.value).subscribe(
          data => {
              if (data._id) {
                  this.successMsgSrv.successMessages('Departamento cadastrado com sucesso.');
              }
          },
          error => {
              this.errorMsg.errorMessages(error);
              console.log('ERROR: ', error);
          }
      );
  }

  editDepartament(departament) {
      this._route.navigate(['/departaments/edit', departament]);
  }

  delete(departament) {
      this.departamentsSrv.delete(departament).subscribe(
          response => {
              this.successMsgSrv.successMessages('Departamento deletado com sucesso.');
              this._route.navigate(['/departaments']);
          },
          error => {
              this.errorMsg.errorMessages(error);
              console.log('ERROR:', error);
          }
      );
  }

  open(name: string, departament) {
      const modalRef = this.modalService.open(MODALS[name]);
      modalRef.componentInstance.item = departament;
      modalRef.componentInstance.data = {
          msgConfirmDelete: 'Departamento foi deletado com sucesso.',
          msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Departamento?',
          msgQuestionDeleteTwo: 'Todas as informações associadas ao departamento serão deletadas.'
      };
      modalRef.componentInstance.delete.subscribe(item => {
          this.delete(item);
      });
  }

  formatterDepartament = (x: { name: string }) => x.name;
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
                res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
              }
              return res;
          })
      )
}
