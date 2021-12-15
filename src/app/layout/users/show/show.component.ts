import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { routerTransition } from '../../../router.animations';
import * as moment from 'moment';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { NgbModal, NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import _ from 'lodash';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { CompaniesService } from 'src/app/services/companies/companies.service';
declare var $: any;

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
    public isCollapsed = true;
  id: String;
  user: User;
  userForm: FormGroup;
  changeUp = false;
  company: any;
  profilesList: any;
  loading: Boolean = true;
  permissions: any = [];
  isViewPermission = false;
  documentsAll: any = [];
  companies: any = [];
  permissionEdit = false;
  permissionDelete = false;

  constructor(
    private route: ActivatedRoute,
    private userSrv: UsersService,
    private fb: FormBuilder,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private successMsgSrv: SuccessMessagesService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private documentsSrv: DocumentsService,
    private companiesSrv: CompaniesService,
    config: NgbModalConfig,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      _id: '',
      email: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
      name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      profile: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      download: this.fb.control({ value: '', disabled: true }),
      physicalDocuments: this.fb.control({ value: '', disabled: true }),
      print: this.fb.control({ value: '', disabled: true }),
      dateCreated: this.fb.control({ value: '', disabled: true }),
      permissions: this.fb.array(this.permissions)
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getCompanies();
    this.getDocuments();
    this.getProfiles();
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

  }

  getProfiles() {
    this.userSrv.profiles().subscribe(data => {
      this.profilesList = data.items;
    }, error => {
      console.log(error);
    });
  }

  searchCompany = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(company => {
        this.company = this.companies.name;
        console.log('sdfsdf', this.company);
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
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get profile() {
    return this.userForm.get('profile');
  }

  get physicalDocuments() {
      return this.userForm.get('physicalDocuments');
  }

  returnDocts(item) {
    const docts = [];
    docts.push({ _id: item });
    console.log('adasdasda', docts);
    return docts;
  }

  createPermissionExist(item): FormGroup {
    return this.fb.group({
      company: {value: item.company, disabled: true},
      docts: {value: item.docts, disabled: true}
    });
  }

  addPermissionExist(item): void {
    this.permissions = this.userForm.get('permissions') as FormArray;
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
        console.log('docAll  ', this.documentsAll);
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
    /* if (e && e.item) {
      _.remove(this.companies, (item) => {
        return item._id === e.item._id
      })
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
      this.documentsSrv.documents(1).subscribe(
        data => {
          if (this.documentsAll.length === 0) {
            data.items.map(item => {
              this.documentsAll.push({ _id: item._id, name: item.name });
            })
            if (!this.user) {
              this.getUser();
            }
          }
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    } */
  }

  returnDoctsArray(permissions) {
    return permissions.map(item => {
      return { company: item.company, docts: [item.docts] };
    });
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
          profile: data.profile,
          profiles: data.profiles,
          download: data.download,
          print: data.print,
          physicalDocuments: data.physicalDocuments,
          dateCreated: data.dateCreated,
          permissions: data.permissions,
          acceptanceTerm: data.acceptanceTerm,
          DateAcceptanceTerm: data.DateAcceptanceTerm
        };

        if (this.user.profiles.indexOf('DAENERYS') === 0) {
          this.isViewPermission = false;
          this.permissions = [];
          this.userForm.value.permissions = [];
        } else {
          this.isViewPermission = true;
        }

        this.userForm.patchValue({
          _id: data._id,
          email: data.email,
          name: data.name,
          // profiles: data.profiles,
          profile: data.profile._id,
          download: data.download,
          print: data.print,
          physicalDocuments: data.physicalDocuments,
          dateCreated: moment(data.dateCreated).format('YYYY-MM-DD'),
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

  changeUpdate() {
    !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
    if (this.changeUp) {
      this.userForm.reset({
        _id: this.user._id,
        email: { value: this.user.email, disabled: false },
        name: { value: this.user.name, disabled: false },
        profiles: { value: this.user.profiles, disabled: false },
        dateCreated: { value: moment(this.user.dateCreated).format('YYYY-MM-DD'), disabled: true }
      });
    }
  }

  editUser(user) {
    this._route.navigate(['/users/edit', user]);
  }

  delete(data) {
    this.loading = true;
    this.userSrv.deleteUser(data).subscribe(
      response => {
        this.loading = false;
        this.successMsgSrv.successMessages('Usuário deletado com sucesso.');
        this._route.navigate(['/users']);
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Usuário foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Usuário?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao usuário serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }
  openMod(content) {
    this.modalService.open(content, { size: 'lg', windowClass: 'my-class', });
  }
}
