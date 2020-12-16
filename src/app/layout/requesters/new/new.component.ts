import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesList } from 'src/app/models/company';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { RequestersService } from 'src/app/services/requesters/requesters.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TypeaheadSettings } from 'ngx-type-ahead';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  storeHouse: Object;
  requesterForm: FormGroup;
  loading: Boolean = false;
  companies: any = [];
  documentsAll: any = [];
  permissions: any = [];
  userExternal = false;

  constructor(
    private requestersSrv: RequestersService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private companiesSrv: CompaniesService,
    private documentsSrv: DocumentsService,
    private config: NgSelectConfig,
    private utilCase: CaseInsensitive
  ) { }

  ngOnInit() {
    this.requesterForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
      fone: this.fb.control('', [Validators.required]),
      permissions: this.fb.array(this.permissions)
    });
    this.getCompanies();
    this.userExternal = JSON.parse(window.localStorage.getItem('userExternal'));
  }

  

  createPermission(): FormGroup {
    return this.fb.group({
      company: '',
      docts: ''
    });
  }

  addPermission(): void {
    this.permissions = this.requesterForm.get('permissions') as FormArray;
    this.permissions.push(this.createPermission());
  }

  removePermission(e) {
    this.permissions.removeAt(e);
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

  get company() {
    return this.requesterForm.get('company');
  }

  get name() {
    return this.requesterForm.get('name');
  }

  get fone() {
    return this.requesterForm.get('fone');
  }

  get email() {
    return this.requesterForm.get('email');
  }

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res;
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

    getDocuments(e) {
      _.remove(this.companies, (item) => {
        return item._id === e.item._id;
      });
      console.log('companies', this.companies);
      this.documentsSrv.searchDocuments(e.item._id).subscribe(
        data => {
          console.log(data);
          this.documentsAll = data.items;
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    }
  
    searchDocument = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(document => {
          let res;
          if (document.length < 2) { []; } else { res = _.filter(this.documentsAll, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10); }
          return res;
        })
      )

  postRequester() {
    this.loading = true;
    this.requestersSrv.newRequester(this.requesterForm.value).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.requesterForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            name: this.fb.control('', [Validators.required]),
            email: this.fb.control('', [Validators.required]),
            fone: this.fb.control('', [Validators.required]),
            docts: this.fb.control('', [Validators.required])
          });
          this.successMsgSrv.successMessages('Depósito cadastrado com sucesso.');
          this._route.navigate(['/requesters']);
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
