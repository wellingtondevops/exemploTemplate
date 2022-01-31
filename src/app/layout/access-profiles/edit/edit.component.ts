import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AccessProfiles } from './../../../models/access-profiles';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Observable } from 'rxjs';
import _ from 'lodash';
@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]

})
export class EditComponent implements OnInit {
    id: String;
    loading: Boolean = true;
    companies: any = [];
    documentsAll: any = [];
    accessProfileForm: FormGroup;
    docts: any = [];
    accessProfile: AccessProfiles;
    company: any;
    isCollapsed = false;
    closeResult = '';

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private _route: Router,
        private profilesSrv: AccessProfilesService,
        private documentsSrv: DocumentsService,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private modalService: NgbModal,
        private errorMsg: ErrorMessagesService,
        public modal: NgbActiveModal,
        private utilCase: CaseInsensitive,
        config: NgbModalConfig,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.accessProfileForm = this.fb.group({
            _id: '',
            name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            docts: this.fb.array(this.docts),
        });

        this.id = this.route.snapshot.paramMap.get('id');

        this.getDocuments();
        // this.getCompanies();

    }

    get name() {
        return this.accessProfileForm.get('name');
    }

    formatter = (x: { name: string }) => x.name;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                let res;
                if (company.length < 2) {
                    [];
                } else {
                    res = _.filter(this.companies, v =>
                        (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        )

    searchDocument = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(document => {
                let res;
                if (document.length < 2) {
                    [];
                } else {
                    res = _.filter(this.documentsAll, v =>
                        (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10);
                }
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

    selectedCompany(e, i) {
        this.getDocuments(e, i);
    }

    getAccessProfile() {
        this.profilesSrv.accessProfile(this.id).subscribe(
            data => {
                this.loading = false;
                this.accessProfile = {
                    _links: data._links,
                    _id: data._id,
                    name: data.name,
                    company: data.company,
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

    // // returnIdCompanyPermissions() {
    // //     const newArray = [];
    // //     this.accessProfileForm.value.docts.map((item) => {
    // //         newArray.push({ docts: item.docts });
    // //     });
    // //     this.accessProfileForm.value.docts = newArray;
    // // }


    // returnDocts(item) {
    //     const docts = [];
    //     docts.push({ _id: item });
    //     return docts;
    // }

    returnDoctsArray(permissions) {
        return permissions.map(item => {
            return { docts: [item.docts] };
        });
    }

    createPermissionExist(): FormGroup {
        this.getDocuments();
        return this.fb.group({
            docts: this.docts
        });
    }

    addPermissionExist(item): void {
        this.docts = this.accessProfileForm.get('docts') as FormArray;
        this.docts.push(this.createPermissionExist());
    }

    open(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'my-class' });
    }

    removePermission(e) {
        this.docts.removeAt(e);
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
                    name: data.name,
                    docts: data.docts,
                });
                // this._route.navigate(['/access-profile']);
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}
