import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Requester } from 'src/app/models/requester';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { RequestersService } from 'src/app/services/requesters/requesters.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import * as moment from 'moment';
import _ from 'lodash';
import { routerTransition } from 'src/app/router.animations';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  id: String;
  requester: Requester;
  requesterForm: FormGroup;
  profilesList: any = [];
  loading: Boolean = true;
  permissions: any = [];
  companies: any = [];
  documentsAll: any = [];

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private requesterSrv: RequestersService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private documentsSrv: DocumentsService,
    private utilCase: CaseInsensitive
  ) { }

  ngOnInit() {

    this.requesterForm = this.fb.group({
      _id: '',
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      fone: this.fb.control('', [Validators.required]),
      permissions: this.fb.array(this.permissions)
    });

    this.id = this.route.snapshot.paramMap.get('id');

    this.getDocuments();
    this.getCompanies();
    if (!this.requester) {
      this.getRequester();
    }
  }

  get name() {
    return this.requesterForm.get('name');
  }

  get email() {
    return this.requesterForm.get('email');
  }

  get fone() {
    return this.requesterForm.get('fone');
  }

  createPermission(): FormGroup {
    return this.fb.group({
      _id: '',
      company: '',
      docts: ''
    });
  }

  returnDocts(item) {
    const docts = [];
    docts.push({ _id: item });
    return docts;
  }

  createPermissionExist(item): FormGroup {
    return this.fb.group({
      _id: item._id,
      company: item.company,
      docts: item.docts
    });
  }

  addPermissionExist(item): void {
    this.permissions = this.requesterForm.get('permissions') as FormArray;
    this.permissions.push(this.createPermissionExist(item));
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

  selectedCompany(e, i) {
    this.getDocuments(e, i);
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

  getDocuments(e = null, i = null) {
    if (e && e.item) {
      this.documentsSrv.searchDocuments(e.item._id).subscribe(
        data => {
          if (i) {
            this.documentsAll[i] = { company: { _id: e.item._id, name: e.item.name }, docts: data.items };
          } else {
            this.documentsAll[i] = { company: { _id: e.item._id, name: e.item.name }, docts: data.items };
          }
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    } else {
      this.documentsSrv.doctsUser(this.id).subscribe(
        data => {
          this.documentsAll = data;

        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    }
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

  returnDoctsArray(permissions) {
    return permissions.map(item => {
      return { _id: item._id, company: item.company, docts: [item.docts] };
    });
  }

  getRequester() {
    this.requesterSrv.requester(this.id).subscribe(
      data => {
        this.loading = false;
        this.requester = {
          _links: data._links,
          _id: data._id,
          email: data.email,
          name: data.email,
          fone: data.fone,
          dateCreated: data.dateCreated,
          permissions: this.returnDoctsArray(data.permissions)
        };

        this.requesterForm.patchValue({
          _id: data._id,
          email: data.email,
          name: data.name,
          fone: data.fone,
          permissions: this.requester.permissions
        });

        this.requester.permissions.map(item => {
          this.addPermissionExist(item);
        });

      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  updateRequester() {
    this.loading = true;
    this.requesterSrv.updateRequester(this.requesterForm.value).subscribe(
      data => {
        this.loading = false;
        this.successMsgSrv.successMessages('Solicitante alterado com sucesso.');
        this.requester = data;

        this.requesterForm.patchValue({
          _id: data._id,
          email: data.email,
          name: data.name,
          fone: data.fone,
          permissions: this.requester.permissions
        });

        this._route.navigate(['/requesters/get', data._id]);
      }, error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

}
