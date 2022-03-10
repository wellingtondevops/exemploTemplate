import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { routerTransition } from '../../../router.animations';
import _ from 'lodash';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { Page } from 'src/app/models/page';
import { BatchesList } from 'src/app/models/batch';
import { BatchesService } from 'src/app/services/batches/batches.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})

export class ListComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
    @ViewChild('instanceDocument',) instanceDocument: NgbTypeahead;
    searchForm: FormGroup;
    companies: any = [];
    loading: Boolean = true;
    permissionNew = false;
    documents: any = [];
    dateSent;
    dateReceived;
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    focusDocument$ = new Subject<string>();
    clickDocument$ = new Subject<string>();
    batches: BatchesList = {
        _links: {
            currentPage: 1,
            foundItems: 0,
            next: '',
            self: '',
            totalPage: 0
        },
        items: []
    };
    page = new Page();

    columns = [
        { name: 'Empresa', prop: 'company.name', width: 750 },
        { name: 'Documento', prop: 'doct.name', width: 600 },
        { name: 'Lote', prop: 'batchNr', width: 150 },
        { name: 'Criado em', prop: 'dateCreated', width: 135, pipe: { transform: this.pipes.datePipe } }
    ];

    constructor(
        private _route: Router,
        private companiesSrv: CompaniesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private fb: FormBuilder,
        private documentsSrv: DocumentsService,
        private utilCase: CaseInsensitive,
        private localStorageSrv: SaveLocal,
        private batchesSrv: BatchesService,
        private introService: IntroJsService,
    ) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            doct: this.fb.control(''),
            batchNr: this.fb.control(''),
            initDate: this.fb.control(''),
            endDate: this.fb.control('')
        });
        this.getCompanies();

        const batch = JSON.parse(this.localStorageSrv.get('batch'));
        if (batch && batch.company) {
            this.searchForm.patchValue({
                company: batch.company,
                doct: batch.doct,
                batchNr: batch.batchNr,

                endDate: batch.endDate,
                initDate: batch.initDate,
            });
            this.getDocuments(batch.company._id);
        }
        this.getBatches();
        this.searchForm.patchValue({endDate: null});
    }

    formatter = (x: { name: string }) => x.name;

    getBatches() {
        this.setPage({ offset: 0 });
    }

    get company() {
        return this.searchForm.get('company');
    }

    selectedCompany(e) {
        this.getDocuments(e.item._id);
    }

    setPage(pageInfo = null) {
        this.loading = true;
        // this.page = null;
        if (pageInfo) {
            this.page.pageNumber = pageInfo.offset;
        }

        this.localStorageSrv.save('batch', this.searchForm.value);

        const newForm = {
            company: null,
            doct: null,
            batchNr: null,
            endDate: null,
            initDate: null,
        };

        this.searchForm.value.company ? newForm.company = this.returnId('company') : null;
        this.searchForm.value.doct ? newForm.doct = this.returnId('doct') : null;
        this.searchForm.value.batchNr ? newForm.batchNr = this.searchForm.value.batchNr : null;
        this.searchForm.value.endDate ? newForm.endDate = this.searchForm.value.endDate : null;
        this.searchForm.value.initDate ? newForm.initDate = this.searchForm.value.initDate : null;

        const searchValue = _.omitBy(newForm, _.isNil);

        this.batchesSrv.searchBatches(searchValue, this.page).subscribe(data => {
            this.page.pageNumber = data._links.currentPage - 1;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            this.batches = data;
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
        });
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

    getDocuments(company_id) {
        this.loading = true;
        this.documentsSrv.searchDocuments(company_id).subscribe(
            data => {
                this.documents = data.items;
                this.loading = false;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
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

    searchDocument = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickDocument$.pipe(filter(() => !this.instanceDocument.isPopupOpen()));
        const inputFocus$ = this.focusDocument$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(document => (document === '' ? this.documents
                : _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10)
            )));
    }

    clear() {
        this.localStorageSrv.clear('volume');

        this.searchForm.patchValue({
            company: null,
            doct: null,
            batchNr: null,
            endDate: null,
            initDate: null
        });
    }

    getBatch(batch) {
        this._route.navigate(['/batches/get', batch._id]);
    }

    changeDate() {
        this.dateSent =
            new Date(this.dateSent).toISOString().slice(0, 10);

        console.log(this.dateSent);
        this.dateReceived = this.dateSent;
    }

    help() {
        this.introService.ListBatches();
    }
}
