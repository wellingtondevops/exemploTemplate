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

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
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
    // this.getProfiles();

  }
  
  createPermission(): FormGroup {
    return this.fb.group({
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
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10); }
        return res;
      })
    )

  getDocuments(e = null, i = null) {
    console.log(i);
    if (e && e.item) {
      this.documentsSrv.searchDocuments(e.item._id).subscribe(
        data => {
          // console.log('data',data);
          if (i) {
            console.log('if', data);
            this.documentsAll[i] = { company: { _id: e.item._id, name: e.item.name }, docts: data.items };
          } else {
            console.log('else', data);
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
          console.log('doctsUser', data);
          this.documentsAll = data;
          if (!this.requester) {
            this.getRequester();
          }
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
        if (document.length < 2) { []; } else { res = _.filter(this.documentsAll, v => v.name.toLowerCase().indexOf(document.toLowerCase()) > -1).slice(0, 10); }
        return res;
      })
    )

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
            permissions: data.permissions
          };
  
          this.requesterForm.patchValue({
            _id: data._id,
            email: data.email,
            name: data.name,
            dateCreated: moment(data.dateCreated).format('YYYY-MM-DD'),
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

}
