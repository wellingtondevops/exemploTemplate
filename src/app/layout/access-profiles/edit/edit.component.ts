import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { AccessProfiles } from './../../../models/access-profiles';
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
    docts: any = [];
    companies: any = [];
    documentsAll: any = [];
    isViewPermission: boolean;
    userExternal = false;
    listDoc: any;

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private _route: Router,
        private route: ActivatedRoute,
        private userSrv: UsersService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private documentsSrv: DocumentsService,
        private utilCase: CaseInsensitive,
        private profilesSrv: AccessProfilesService,
    ) {
        this.userExternal = JSON.parse(window.localStorage.getItem('userExternal'));
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.accessProfileForm = this.fb.group({
            _id: '',
            name: this.fb.control({ value: '' }),
            company: this.fb.control({ value: ''}),
            docts: this.fb.array(this.docts),
        });
        console.log('asdass', this.docts);

        this.id = this.route.snapshot.paramMap.get('id');
        console.log('oID', this.id);

        this.getDocuments();
        this.getCompanies();
    }

    get name() {
        return this.accessProfileForm.get('name');
    }

    // returnDocts(item) {
    //     const docts = [];
    //     docts.push({ _id: item });
    //     return docts;
    // }

    // createPermissionExist(item): FormGroup {
    //     this.getDocuments();
    //     return this.fb.group({
    //         docts: {value: item.docts, disabled: true}
    //     });
    // }

    // addPermissionExist(item): void {
    //     this.docts = this.accessProfileForm.get('docts') as FormArray;
    //     this.docts.push(this.createPermissionExist(item));
    // }

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

    // selectedCompany(e, i) {
    //     this.getDocuments(e, i);
    // }

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
        console.log("i", i);
        if (e && e.item) {
            this.documentsSrv.searchDocuments(e.item._id).subscribe(
                data => {
                    // console.log('data',data);
                    if (i) {
                        console.log('if', data);
                        this.documentsAll[i] = { docts: data.items };
                    } else {
                        console.log('else', data);
                        this.documentsAll = { docts: data.items };
                    }
                    if (!this.accessProfile) {
                        this.getAccessProfile();
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
                        return   item.name ;
                    });
                    if (!this.accessProfile) {
                        this.getAccessProfile();
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
                if (document.length < 2) {
                    [];
                } else {
                    res = _.filter(this.documentsAll,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        )

    // returnIdCompanyPermissions() {
    //     const newArray = [];
    //     this.accessProfileForm.value.docts.map((item) => {
    //         newArray.push(item.docts);
    //     });
    //     this.accessProfileForm.value.docts = newArray;
    // }

    getAccessProfile() {
        this.profilesSrv.accessProfile(this.id).subscribe(
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
                    name: this.accessProfile.name,
                    company: this.accessProfile.company,
                    docts: this.accessProfile.docts
                });
                // this.accessProfile.docts.map(item => {

                //     this.addPermissionExist(item);
                // });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    returnDoctsArray(docts) {
        return docts.map(item => {
            return item.docts;
        });
    }

    updateAccessProfile() {
        this.loading = true;
        this.profilesSrv.update(this.accessProfileForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
                this.accessProfile = data;
                this.accessProfileForm.patchValue({
                    _id: this.accessProfile._id,
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
