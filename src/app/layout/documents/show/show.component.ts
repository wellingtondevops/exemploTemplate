import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Document } from 'src/app/models/document';
import { routerTransition } from 'src/app/router.animations';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Company } from 'src/app/models/company';
import _ from 'lodash';
import * as moment from 'moment';

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
  document: Document;
  loading: Boolean = true;
  documentForm: FormGroup;
  labels: any = [];
  id: string;
  public typeFieldList: any = TypeFieldListEnum;
  company: Company;
  permissionEdit = false;
  permissionDelete = false;

  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private documentSrv: DocumentsService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
    private companiesSrv: CompaniesService,
  ) {
    this.loading = true;
    this.documentForm = this.fb.group({
      _id: '',
      company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      dateCreated: this.fb.control({ value: '', disabled: true}),
      label: this.fb.array(this.labels),
      dcurrentLabel: this.fb.control({ value: '', disabled: true}),
      dcurrentValue: this.fb.control({ value: 0, disabled: true}),
      dintermediateValue: this.fb.control({ value: 0, disabled: true}),
      dfinal: this.fb.control({ value: '', disabled: true})
    });

  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocument();
    this.getCompanies();
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
  }

  get companyIpt() {
    return this.documentForm.get('company');
  }

  createLabel(item): FormGroup {
    return this.fb.group({
      namefield: { value: item.namefield, disabled: true },
      typeField: { value: item.typeField, disabled: true },
      uniq: { value: item.uniq, disabled: true },
      timeControl: { value: item.timeControl, disabled: true }
    });
  }

  addLabel(item): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabel(item));
  }

  removeDepartament(e) {
    this.labels.removeAt(e);
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

  getDocument() {
    this.loading = true;
    this.documentSrv.document(this.id).subscribe(
      data => {
        this.document = data;
        this.documentForm.patchValue({
          _id: this.document._id,
          label: this.document.label ? this.document.label : [],
          name: this.document.name,
          company: this.document.company,
          dateCreated: moment(this.document.dateCreated).format('DD/MM/YYYY'),
          dcurrentLabel: this.document.dcurrentLabel,
          dcurrentValue: this.document.dcurrentValue,
          dintermediateValue: this.document.dintermediateValue,
          dfinal: this.document.dfinal
        });
        this.document.label.map(item => {
          this.addLabel(item);
        });
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR', error);
      }
    );
  }

  editDocument(document) {
    this._route.navigate(['/documents/edit', document]);
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Documento foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o documento?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao documento serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  delete(document) {
    this.loading = true;
    this.documentSrv.delete(document).subscribe(
      data => {
        this.loading = false;
        this.successMsgSrv.successMessages('Documento deletado com sucesso.');
        this._route.navigate(['/documents']);
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

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
