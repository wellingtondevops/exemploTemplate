import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import _ from 'lodash';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { Page } from 'src/app/models/page';
import { CompanyServiceSearchList } from 'src/app/models/service';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CompanyServicesService } from 'src/app/services/company-services/company-services.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
    selector: 'app-company-services-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;

    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    searchForm: FormGroup;
    services: any = [];
    page = new Page();
    loading: Boolean = true;

    columns = [
        { name: 'Nome', prop: 'company.name', width: 1655 },
    ];
    permissionNew = false;
    companies: any;

    constructor(
        private companyserviceSrc: CompanyServicesService,
        private companiesSrv: CompaniesService,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private fb: FormBuilder,
        private utilCase: CaseInsensitive,
        private localStorageSrv: SaveLocal,
        private introService: IntroJsService,
    ) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            company: this.fb.control(null, Validators.required),
        });
        const value = JSON.parse(this.localStorageSrv.get('value'));
        if (value && value.company) {
            this.searchForm.patchValue({
                company: value.company
            });
        }
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;

        this.getCompanies();
        this.getCompanyServices();
    }

    get company() {
        return this.searchForm.get('company');
    }

    getCompanies() {
        this.companiesSrv.searchCompanies().subscribe(
            data => {
                this.companies = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    formatter = (x: { name: string }) => x.name;

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

    getCompanyService(service) {
        this._route.navigate(['/company-services/get', service._id]);
    }

    getCompanyServices() {
        this.setPageCompanyServices({ offset: 0 });
    }

    setPageCompanyServices(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo ? pageInfo.offset ? pageInfo.offset : 0 : 0;
        this.localStorageSrv.save('value', this.searchForm.value);
        if (this.company.valid) {
            console.log(this.searchForm.value);
            this.companyserviceSrc.searchServices({ company: this.searchForm.get('company').value.name }, this.page).subscribe(
                data => {
                    this.services = data;
                    this.page.pageNumber = data._links.currentPage - 1;
                    this.page.totalElements = data._links.foundItems;
                    this.page.size = data._links.totalPage;
                    this.loading = false;
                },
                error => {
                    this.errorMsg.errorMessages(error);
                    console.log('ERROR: ', error);
                    this.loading = false;
                }
            );
        } else {
            this.companyserviceSrc.services(this.page).subscribe(
                data => {
                    this.services = data;
                    this.page.pageNumber = data._links.currentPage - 1;
                    this.page.totalElements = data._links.foundItems;
                    this.page.size = data._links.totalPage;
                    this.loading = false;
                },
                error => {
                    this.errorMsg.errorMessages(error);
                    console.log('ERROR: ', error);
                    this.loading = false;
                }
            );
        }
    }
    clear() {
        this.localStorageSrv.clear('value');

        this.searchForm.patchValue({
            company: null
        });
    }

    help() {
        this.introService.ListCompServices();
    }
}
