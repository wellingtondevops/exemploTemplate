import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Report } from 'src/app/models/report'
import { SaveLocal } from 'src/app/storage/saveLocal';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import _ from 'lodash'
import * as moment from 'moment'
import { ReportsService } from 'src/app/services/reports/reports.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
    animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
    searchForm: FormGroup;
    companies: any = [];
    loading: Boolean = false;
    reports: Report;
    dateSent;
    dateReceived;
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();

    constructor(
        private _route: Router,
        private reportSrv: ReportsService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private pipes: Pipes,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
        private utilCase: CaseInsensitive
    ) { }

    ngOnInit() {
        this.getCompanies();

        this.searchForm = this.fb.group({
            company: this.fb.control(null, [Validators.required]),
            initDate: this.fb.control(null, [Validators.required]),
            endDate: this.fb.control(null, [Validators.required])
        });

        this.searchForm.patchValue({endDate: null});

    }

    get company() {
        return this.searchForm.get('company');
    }

    get initDate() {
        return this.searchForm.get('initDate');
    }

    get endDate() {
        return this.searchForm.get('endDate');
    }

    returnId(object) {
        const result = _.filter(this.searchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
        return result;
    }

    getCompanies() {
        this.companiesSrv.searchCompanies().subscribe(
            data => {
                this.companies = data.items;
                this.loading = false;
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

    getReports() {
        // const newForm = {
        //     name: null
        // };
        // newForm.name = this.searchForm.value.company.name;

        this.localStorageSrv.save('company', this.searchForm.value.company.name);
        console.log('dasdad', this.localStorageSrv.get('company'));

        this.searchForm.value.company = this.returnId('company') ;
        this.loading = true;
        this.reportSrv.reports(this.searchForm.value).subscribe(data => {
            this.reports = data;
            this.reports.initialPeriod = moment(this.reports.initialPeriod).format('DD/MM/YYYY');
            this.reports.finalPeriod = moment(this.reports.finalPeriod).format('DD/MM/YYYY');
            // this.searchForm.patchValue({company: null});
            this.searchForm.patchValue({name: this.localStorageSrv.get('company')});
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error);
            this.errorMsg.errorMessages(error);
            this.loading = false;
        });
    }

    changeDate() {
        this.dateSent =
            new Date(this.dateSent).toISOString().slice(0, 10);
        this.dateReceived = this.dateSent;
    }
}
