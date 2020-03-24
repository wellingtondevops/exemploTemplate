import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import _ from 'lodash';
import { DocumentsService } from 'src/app/services/documents/documents.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  user: Object;
  userForm: FormGroup;
  profilesList: any;
  loading: Boolean = false;
  companies: any = [];
  documentsAll: any = [];
  searchSubscribe: string = '';
  permissions: any = [];

  constructor(
    private _route: Router,
    private userSrv: UsersService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private documentsSrv: DocumentsService,
  ) {
    this.profilesList = ProfileEnum;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      profiles: this.fb.control('', [Validators.required]),
      permissions: this.fb.array(this.permissions)
    });

    this.getCompanies();
  }

  createPermission(): FormGroup {
    return this.fb.group({
      company: '',
      docts: ''
    });
  }

  addPermission(): void {
    this.permissions = this.userForm.get('permissions') as FormArray;
    this.permissions.push(this.createPermission());
  }

  removePermission(e) {
    this.permissions.removeAt(e);
  }

  formatter = (x: { name: string }) => x.name;

  get company() {
    return this.userForm.get('company');
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get profiles() {
    return this.userForm.get('profiles');
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

  getDocuments(e) {
    _.remove(this.companies, (item) => {
      return item._id === e.item._id
    })
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
        var res;
        if (document.length < 2) [];
        else res = _.filter(this.documentsAll, v => v.name.toLowerCase().indexOf(document.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

  returnIdCompanyPermissions() {
    let newArray = [];
    this.userForm.value.permissions.map((item) => {
      newArray.push({ company: item.company._id, docts: item.docts });
    });
    this.userForm.value.permissions = newArray;
  }

  isAdminSelect() {
    if(this.userForm.get('profiles').value === 'DAENERYS') {
      return true
    }
    return false
  }

  postUser() {
    this.loading = true;
    this.returnIdCompanyPermissions();
    console.log(this.userForm.value);
    this.userSrv.newUser(this.userForm.value).subscribe(
      data => {
        if (data._id) {
          this.loading = false;
          this.successMsgSrv.successMessages('Usuário cadastrado com sucesso.');
          this._route.navigate(['/users']);
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
