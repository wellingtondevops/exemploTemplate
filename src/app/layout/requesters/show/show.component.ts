import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Requester } from 'src/app/models/requester';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { RequestersService } from 'src/app/services/requesters/requesters.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import * as moment from 'moment';
import _ from 'lodash';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';

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
  id: String;
  requester: Requester;
  requesterForm: FormGroup;
  changeUp = false;
  profilesList: any;
  loading: Boolean = true;
  permissions: any = [];
  isViewPermission = false;
  documentsAll: any = [];
  companies: any = [];
  permissionEdit = false;
  permissionDelete = false;
  user: User;


  constructor(
    private route: ActivatedRoute,
    private requesterSrv: RequestersService,
    private fb: FormBuilder,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private successMsgSrv: SuccessMessagesService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private documentsSrv: DocumentsService,
    private companiesSrv: CompaniesService,
    private userSrv: UsersService,
  ) { }

  ngOnInit() {
    this.requesterForm = this.fb.group({
      _id: '',
      email: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
      name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      fone: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      dateCreated: this.fb.control({ value: '', disabled: true }),
      permissions: this.fb.array(this.permissions)
    });

    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompanies();
    this.getDocuments();
  }

  editRequester(requester) {
    this._route.navigate(['/requesters/edit', requester]);
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

  get name() {
    return this.requesterForm.get('name');
  }

  get email() {
    return this.requesterForm.get('email');
  }

  get fone() {
    return this.requesterForm.get('fone');
  }

  returnDocts(item) {
    const docts = [];
    docts.push({ _id: item });
    return docts;
  }

  createPermissionExist(item): FormGroup {
    return this.fb.group({
      company: { value: item.company, disabled: true },
      docts: { value: item.docts, disabled: true }
    });
  }

  addPermissionExist(item): void {
    this.permissions = this.requesterForm.get('permissions') as FormArray;
    this.permissions.push(this.createPermissionExist(item));
  }

  removePermission(e) {
    this.permissions.removeAt(e);
  }

  formatter = (x: { name: string }) => x.name;

  getDocuments(e = null) {
    this.documentsSrv.doctsUser(this.id).subscribe(
      data => {
        this.documentsAll = data;
        if (!this.requester) {
          this.getRequester();
        }
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

  getUser() {
    this.userSrv.user(this.id).subscribe(
      data => {
        this.user = data;
        this.loading = false;
        if (this.user.profiles.indexOf('DAENERYS') === 0) {
          this.isViewPermission = false;
          // this.permissions = [];
        } else {
          this.isViewPermission = true;
        }

        this.user.permissions.map(item => {
          // this.addPermissionExist(item);
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
