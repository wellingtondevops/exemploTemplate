import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CaseInsensitive } from './../../../utils/case-insensitive';
import { DocumentsService } from './../../../services/documents/documents.service';
import { CompaniesService } from './../../../services/companies/companies.service';
import { ErrorMessagesService } from './../../../utils/error-messages/error-messages.service';
import { SuccessMessagesService } from './../../../utils/success-messages/success-messages.service';
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Observable, Subject, merge } from 'rxjs';
import _ from 'lodash';
declare var $;

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
    public isCollapsed = true;
    profileForm: FormGroup;
    loading: Boolean = false;
    companies: any;
    documentAll: any = [];
    userExternal = false;
    docts: any = [];
    documentsAll: any = [];
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();

    constructor(
        private _route: Router,
        private fb: FormBuilder,
        private modalService: NgbModal,
        private profileSrv: AccessProfilesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private documentsSrv: DocumentsService,
        private utilCase: CaseInsensitive

    ) { }

    ngOnInit() {
        this.userExternal = JSON.parse(window.localStorage.getItem('userExternal'));

        this.profileForm = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            company: this.fb.control('', [Validators.required]),
        });

        this.getCompanies();
        this.addPermission();

        if (this.userExternal) {
            this.addPermission();
        }

    }

    get company() {
        return this.profileForm.get('company');
    }

    get name() {
        return this.profileForm.get('name');
    }

    formatter = (x: { name: string }) => x.name;

    removePermission(e) {
        this.docts.removeAt(e);
    }

    createPermission(): FormGroup {
        return this.fb.group({
            docts: '',
            company: ''
        });
    }

    addPermission(): void {
        this.docts = this.profileForm.get('docts') as FormArray;
        this.docts.push(this.createPermission());
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

    searchCompany = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCompany$.pipe(filter(() => !this.instanceCompany.isPopupOpen()));
        const inputFocus$ = this.focusCompany$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(company => {
                let res = [];
                if (company.length < 0) {
                    [];
                } else {
                    res = _.filter(this.companies,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        );
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

    open(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'my-class' });
    }

    getDocuments(e) {
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

    returnIdCompanyDoct() {
        const newArray = [];
        this.profileForm.value.docts.map((item) => {
            newArray.push(item.docts);
        });
        this.profileForm.value.docts = newArray.pop();
    }

    postProfile() {
        this.loading = true;
        this.profileSrv.newProfile(this.profileForm.value).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Perfil cadastrado com sucesso.');
                    this._route.navigate(['/access-profiles/get', data._id]);
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
