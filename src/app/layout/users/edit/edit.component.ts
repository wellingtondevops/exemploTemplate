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
    this.getDocuments();
    this.userForm = this.fb.group({
      _id: '',
      email: this.fb.control('', [Validators.required, Validators.email]),
      name: this.fb.control('', [Validators.required]),
      profiles: this.fb.control('', [Validators.required]),
      company: this.fb.control(''),
      permissions: this.fb.array(this.permissions)
    });
    
    this.id = this.route.snapshot.paramMap.get('id');
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
    // this.getDocuments(item.company)
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
    console.log('getDocuments', e);
    if (e && e.item) {
      _.remove(this.companies, (item) => {
        return item._id === e.item._id
      })
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
    } else {
      this.documentsSrv.documents(1).subscribe(
        data => {
          if (this.documentsAll.length === 0) {
            data.items.map(item => {
              this.documentsAll.push({ _id: item._id, name: item.name });
            })

            console.log(this.documentsAll);
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

  selectDocts(e) {
    console.log('selectDocts', e);
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
          permissions: [
            {
              company: {
                _id: "5e46d12e4587937fd9d1b1df",
                name: "RUBENS MANSUR"
              },
              docts: [[
                "5e46d2da4587937fd9d1b1e8",
                "5e46d4774587937fd9d1b1fb"
              ]]
            },
            {
              company: {
                _id: "5e46d1e64587937fd9d1b1e1",
                name: "VALE DO TIJUCO AÇUCAR E ALCOOL LTDA"
              },
              docts: [[
                "5e46d4214587937fd9d1b1f8",
                "5e46d3364587937fd9d1b1ec"
              ]]
            }
          ]
        };

        this.userForm.patchValue({
          _id: this.user._id,
          email: this.user.email,
          name: data.name,
          profiles: data.profiles,
          permissions: this.user.permissions
        });
        console.log(this.user)
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
          name: data.name
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
