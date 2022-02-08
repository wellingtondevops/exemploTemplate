import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { AccessProfiles } from './../../../models/access-profiles';
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
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    providers: [NgbModalConfig, NgbModal],
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {
    isCollapsed = false;
    id: String;
    closeResult = '';
    accessProfile: AccessProfiles;
    accessProfileForm: FormGroup;
    profilesList: any = [];
    loading: Boolean = true;
    permissions: any = [];
    companies: any = [];
    listDoc: any;
    documentsAll: any = [];
    isViewPermission: boolean;
    userExternal = false;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private _route: Router,
        private route: ActivatedRoute,
        private userSrv: UsersService,
        private accessSrv: AccessProfilesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private documentsSrv: DocumentsService,
        private utilCase: CaseInsensitive
    ) {
        this.userExternal = JSON.parse(window.localStorage.getItem('userExternal'));
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.accessProfileForm = this.fb.group({
            _id: '',
            name: this.fb.control(null, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            docts: this.fb.array(this.permissions)
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.getDocuments();
        this.getCompanies();
        this.getUser();

    }

    get name() {
        return this.accessProfileForm.get('name');
    }

    createPermission(): FormGroup {
        return this.fb.group({
            docts: ''
        });
    }

    returnDocts(item) {
        const docts = [];
        docts.push({ _id: item });
        return docts;
    }

    createPermissionExist(item): FormGroup {
        this.getDocuments();
        return this.fb.group({

            docts: item.docts
        });
    }

    addPermissionExist(item): void {
        this.permissions = this.accessProfileForm.get('docts') as FormArray;
        this.permissions.push(this.createPermissionExist(item));
    }

    addPermission(): void {
        this.permissions = this.accessProfileForm.get('docts') as FormArray;
        this.permissions.push(this.createPermission());
    }

    removePermission(e) {
        this.permissions.removeAt(e);
    }

    open(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'my-class' });
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
                    res = _.filter(this.companies,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        )

    getDocuments(e = null, i = null) {
        console.log(i);
        if (e && e.item) {
            this.documentsSrv.searchDocuments(e.item._id).subscribe(
                data => {
                    console.log('else', data);
                    this.documentsAll[i] = { docts: data.items };
                    if (!this.accessProfile) {
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
            this.documentsSrv.doctsAccessProfile(this.id).subscribe(
                data => {
                    console.log('doctsUser', data);
                    this.documentsAll = data;
                    this.listDoc = this.documentsAll.docts.map(item => {
                        return item.name;
                    });
                    if (!this.accessProfile) {
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
                let res;
                if (document.length < 2) { []; } else { res = _.filter(this.documentsAll, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10); }
                return res;
            })
        )

    returnIdCompanyPermissions() {
        const newArray = [];
        this.accessProfileForm.value.permissions.map((item) => {
            newArray.push({ docts: item.docts });
        });
        this.accessProfileForm.value.permissions = newArray;
    }

    getUser() {
        this.accessSrv.accessProfile(this.id).subscribe(
            data => {
                this.loading = false;
                this.accessProfile = {
                    _links: data._links,
                    _id: data._id,
                    company: data.company,
                    name: data.name,
                    docts: this.returnDoctsArray(data.docts)
                };

                this.accessProfileForm.patchValue({
                    _id: this.accessProfile._id,
                    name: data.name,
                    company: data.company,
                    docts: this.accessProfile.docts
                });

                this.accessProfile.docts.map(item => {
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
            return { docts: [item.docts] };
        });
    }


    updateUser() {
        this.loading = true;
        this.accessSrv.update(this.accessProfileForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
                this.accessProfile = data;
                this.accessProfileForm.patchValue({
                    _id: this.accessProfile._id,
                    name: data.name,
                    docts: data.docts,
                });
                this._route.navigate(['/access-profiles/get', this.accessProfile._id]);
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
    goBack() {
        this._route.navigate(['/access-profiles/get', this.accessProfile._id]);
    }
}
