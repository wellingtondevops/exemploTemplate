import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { RedemptionEnum } from 'src/app/models/redemption.enum';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { routerTransition } from 'src/app/router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  loading: Boolean = false;
  documentForm: FormGroup;
  labels: any = [];
  public retentionList: any = RedemptionEnum;
  public typeFieldList: any = TypeFieldListEnum;
  companies: any = []

  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private documentSrv: DocumentsService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
  ) {

  }

  formatter = (x: { name: string }) => x.name;

  get company() {
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
      company: this.fb.control('', Validators.required),
      name: this.fb.control('', [Validators.required]),
      retention: this.fb.control('', [Validators.required]),
      retentionTime: this.fb.control('', [Validators.required]),
      label: this.fb.array(this.labels)
    });

    this.getCompanies();

  }

  returnId(object) {
    this.documentForm.value[object] = _.filter(this.documentForm.value[object], function (value, key) {
      if (key === '_id') return value;
    })[0];
  }

  createLabel(): FormGroup {
    return this.fb.group({
      namefield: '',
      typeField: '',
      uniq: ''
    });
  }

  addLabel(): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabel());
  }

  removeLabel(e) {
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

  searchCompany = (text$: Observable<string>) =>
      text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(company => {
              var res;
              if (company.length < 2) [];
              else res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
              return res;
          })
      );

  postDocument() {
    this.loading = true;
    this.returnId('company');

    var documentForm = _.omitBy(this.documentForm.value, _.isNil);
    this.documentSrv.newDocument(documentForm).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Documento cadastrado com sucesso.');
          this._route.navigate(['/documents']);
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
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}
