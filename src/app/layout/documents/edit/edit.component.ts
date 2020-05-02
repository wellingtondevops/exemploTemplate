import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { RedemptionEnum } from 'src/app/models/redemption.enum';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { Document } from 'src/app/models/document';
import _ from 'lodash';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  id: string;
  document: Document;
  loading: Boolean = true;
  documentForm: FormGroup;
  companies: any = [];
  labels: any = [];
  public retentionList: any = RedemptionEnum;
  public typeFieldList: any = TypeFieldListEnum;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private documentsSrv: DocumentsService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
  ) {
  }

  get companyIpt() {
    return this.documentForm.get('company');
  }
  get name() {
    return this.documentForm.get('name');
  }
  get retentionTime() {
    return this.documentForm.get('retentionTime');
  }
  get retention() {
    return this.documentForm.get('retention');
  }

  ngOnInit() {
    this.documentForm = this.fb.group({
      _id: '',
      company: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      retention: this.fb.control('', [Validators.required]),
      retentionTime: this.fb.control('', [Validators.required]),
      label: this.fb.array(this.labels)
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocument();
    this.getCompanies();
  }

  createLabelExist(item): FormGroup {
    return this.fb.group({
      namefield: item.namefield,
      typeField: item.typeField,
      uniq: item.uniq
    });
  }

  createLabel(): FormGroup {
    return this.fb.group({
      namefield: '',
      typeField: '',
      uniq: ''
    });
  }

  addLabelExist(item): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabelExist(item));
  }

  addLabel(): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabel());
  }

  removeLabel(e) {
    this.labels.removeAt(e);
  }

  getDocument() {
    this.documentsSrv.document(this.id).subscribe(data => {
      if (data._id) {
        this.document = data;
        this.documentForm.patchValue({
          _id: data._id,
          name: data.name,
          company: data.company,
          retention: data.retention,
          retentionTime: data.retentionTime,
          label: data.label
        });
        this.document.label.map(item => {
          this.addLabelExist(item);
        });
        this.loading = false;
      }
    });
  }

  updateDocument() {
    this.loading = true;
    const document = _.omitBy(this.documentForm.value, _.isNil);
    this.documentsSrv.updateDocument(document).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Documento alterada com sucesso.');
          this._route.navigate(['/documents']);
        }
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

  returnId(object) {
    this.documentForm.value[object] = _.filter(this.documentForm.value[object], function (value, key) {
      if (key === '_id') {
        return value;
      }
    })[0];
  }

  formatter = (x: { name: string }) => x.name;

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
