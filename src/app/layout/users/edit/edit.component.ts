import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import _ from 'lodash';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  id: String;
  user: User;
  userForm: FormGroup;
  profilesList: any;
  loading: Boolean = true;
  permissions: any = [];
  companies: any = [];
  documentsAll: any = [];
  isViewPermission: boolean;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
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
      _id: '',
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      profiles: this.fb.control('', [Validators.required]),
      company: this.fb.control(''),
      permissions: this.fb.array(this.permissions)
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocuments();
    this.getCompanies();
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

  createPermission(): FormGroup {
    return this.fb.group({
      company: '',
      docts: ''
    });
  }

  returnDocts(item) {
    let docts = []
    docts.push({ _id: item })
    return docts;
  }

  createPermissionExist(item): FormGroup {
    return this.fb.group({
      company: item.company,
      docts: item.docts
    });
  }

  addPermissionExist(item): void {
    this.permissions = this.userForm.get('permissions') as FormArray;
    this.permissions.push(this.createPermissionExist(item));
  }

  addPermission(): void {
    this.permissions = this.userForm.get('permissions') as FormArray;
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

  selectedCompany(e) {
    this.getDocuments(e);
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

  getDocuments(e = null) {
    if (e && e.item) {
      this.documentsSrv.searchDocuments(e.item._id).subscribe(
        data => {
          this.documentsAll = data.items;
          if (!this.user) {
            this.getUser();
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
          if (!this.user) {
            this.getUser();
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

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        this.loading = false;
        this.user = {
          _links: data._links,
          _id: data._id,
          email: data.email,
          name: data.email,
          profiles: data.profiles,
          dateCreated: data.dateCreated,
          permissions: this.returnDoctsArray(data.permissions)
        };

        if (this.user.profiles.indexOf('DAENERYS') === 0) {
          this.isViewPermission = false
          this.permissions = [];
          this.userForm.value.permissions = []
        } else {
          this.isViewPermission = true
        }

        this.userForm.patchValue({
          _id: this.user._id,
          email: this.user.email,
          name: data.name,
          profiles: data.profiles,
          permissions: this.user.permissions
        });
        this.user.permissions.map(item => {
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

  returnDoctsArray(permissions) {
    return permissions.map(item => {
      return { company: item.company, docts: [item.docts] }
    })
  }

  isAdminSelect() {
    if (this.userForm.get('profiles').value === 'DAENERYS') {
      this.permissions = [];
      this.userForm.value.permissions = []
      this.isViewPermission = false
    } else {
      this.isViewPermission = true
    }
  }

  updateUser() {
    this.loading = true;
    this.userSrv.updateUser(this.userForm.value).subscribe(
      data => {
        this.loading = false;
        this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
        this.user = data;
        this.userForm.patchValue({
          _id: this.user._id,
          email: this.user.email,
          name: data.name,
          permissions: data.permissions,
        });
        this._route.navigate(['/users']);
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }
}
