import { routerTransition } from 'src/app/router.animations';
import { ColumnMode } from './../../../models/column-mode.types';
import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { Archive } from 'src/app/models/archive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import _ from 'lodash';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { NgbTypeahead, NgbTypeaheadConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SaveLocal } from '../../../storage/saveLocal';
import { CaseInsensitive } from '../../../utils/case-insensitive';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

@Component({
    selector: 'app-simple-list',
    templateUrl: './simple-list.component.html',
    styleUrls: ['./simple-list.component.scss'],
    animations: [routerTransition()]
})
export class SimpleListComponent implements OnInit {
    @ViewChild('myTable') table: any;
    @ViewChild('instanceDepartament') instanceDepartament: NgbTypeahead;
    @ViewChild('instanceDocument',) instanceDocument: NgbTypeahead;
    @ViewChild('instanceStorehouse',) instanceStorehouse: NgbTypeahead;
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
    @ViewChild('searchTypeahead',)
    private readonly typeahead: NgbTypeahead;
    archives: Archive[];
    noExternal = false;
    archivesCol: any[];
    page = new Page();
    loading = false;
    searchForm: FormGroup;
    companies: any = [];
    company_id: string;
    departaments: any = [];
    documents: any = [];
    document: any;
    focusDepartament$ = new Subject<string>();
    clickDepartament$ = new Subject<string>();
    focusDocument$ = new Subject<string>();
    clickDocument$ = new Subject<string>();
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    fileXls: string;
    archiveExport: string;
    nameArchiveExport: string;
    dateSent;
    currentValue;
    dateReceived;
    ColumnMode = ColumnMode;


    constructor(
        private archiveSrv: ArquivesService,
        private errorMsg: ErrorMessagesService,
        private _route: Router,
        private fb: FormBuilder,
        private companiesSrv: CompaniesService,
        private departamentsSrv: DepartamentsService,
        private documentsSrv: DocumentsService,
        private warningMsg: WarningMessagesService,
        private localStorageSrv: SaveLocal,
        private utilCase: CaseInsensitive,
        config: NgbTypeaheadConfig,
        private introService: IntroJsService,
        private modalService: NgbModal,


    ) {
        config.showHint = true;
        config.container = 'body';
        config.focusFirst = false;
    }

    ngOnInit() {
        // this.setPage({ offset: 0 });
        this.searchForm = this.fb.group({
            company: this.fb.control(null, Validators.required),
            departament: this.fb.control(null, [Validators.required]),
            doct: this.fb.control(null, Validators.required),
            search: this.fb.control(null, Validators.required),
            endDate: this.fb.control(null),
            initDate: this.fb.control(null),
        });

        const archive = JSON.parse(this.localStorageSrv.get('archive'));

        if (archive && archive.company) {
            this.searchForm.patchValue({
                company: archive.company,
                departament: archive.departament,
                doct: archive.doct,
                search: archive.search,
                endDate: archive.endDate,
                initDate: archive.initDate,
            });
            this.selectedCompany(archive.company._id);
        }

        this.getArchive();
        this.noExternal = this.NoExternal();
        this.getCompanies();
        this.searchForm.patchValue({ endDate: null });
    }

    NoExternal() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('userExternal')) === true) {
            res = true;
        }
        return res;
    }

    formatter = (x: { name: string }) => x.name;

    get company() {
        return this.searchForm.get('company');
    }
    get departament() {
        return this.searchForm.get('departament');
    }
    get doct() {
        return this.searchForm.get('doct');
    }

    returnId(object) {
        const result = _.filter(this.searchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
        return result;
    }

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;

        this.localStorageSrv.save('archive', this.searchForm.value);

        const newSearch = {
            company: null,
            departament: null,
            doct: null,
            search: null,
            endDate: null,
            initDate: null,
        };

        this.searchForm.value.company ? newSearch.company = this.returnId('company') : null;
        this.searchForm.value.departament ? newSearch.departament = this.returnId('departament') : null;
        this.searchForm.value.doct ? newSearch.doct = this.returnId('doct') : null;
        newSearch.search = this.searchForm.value.search;
        newSearch.endDate = this.searchForm.value.endDate;
        newSearch.initDate = this.searchForm.value.initDate;

        const searchValue = _.omitBy(newSearch, _.isNil);

        this.archiveSrv.archives(searchValue, this.page, null).subscribe(data => {
            this.page.pageNumber = data._links.currentPage - 1;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            const resultWithIndex = this.newRegisters(data.items);
            this.archives = resultWithIndex;
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log('ERROR: ', error);
            this.errorMsg.errorMessages(error);
        });
    }

    toggleExpandRow(row) {
        this.table.rowDetail.toggleExpandRow(row);
    }

    showView(value) {
        if (value.type === 'click') {
            this._route.navigate(['/archives/get', value.row._id]);
        }
    }

    getArchive() {
        this.setPage({ offset: 0 });
    }

    clear() {
        this.localStorageSrv.clear('archive');
        this.searchForm.patchValue({
            company: null,
            departament: null,
            doct: null,
            search: null,
            endDate: null,
            initDate: null,
        });
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

    selectedCompany(e) {
        if (e && e.item && e.item._id) {
            this.getDocuments(e.item._id);
            this.getDepartaments(e.item._id);
        } else {
            this.getDocuments(e);
            this.getDepartaments(e);
        }
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

    getDepartaments(company_id) {
        this.departamentsSrv.searchDepartaments(company_id).subscribe(
            data => {
                this.departaments = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    searchDepartament = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickDepartament$.pipe(filter(() => !this.instanceDepartament.isPopupOpen()));
        const inputFocus$ = this.focusDepartament$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(departament => (departament === '' ? this.departaments
                : _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10)
            )));
    }

    getDocuments(company_id) {
        this.documentsSrv.searchDocuments(company_id).subscribe(
            data => {
                this.documents = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
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

    /*   searchDocument = (text$: Observable<string>) =>
        text$.pipe(
          debounceTime(200),
          distinctUntilChanged(),
          map(document => {
            var res;
            if (document.length < 2) [];
            else res = _.filter(this.documents, v => v.name.toLowerCase().indexOf(document.toLowerCase()) > -1).slice(0, 10);
            return res;
          })
        ); */

    newRegisters(registers) {
        registers.map(item => {
            item.index = this.mapLabel(item.doct.label, item.tag);
        });
        return registers;
    }

    mapLabel(labels, tags) {
        let obj = '';
        labels.map((item, i) => {
            if (i === (labels.length - 1)) {
                obj += `<u><b>${item.namefield}:&nbsp</b></u> ${tags[i] || ''}</br>`;
            } else {
                obj += `<u><b>${item.namefield}:&nbsp</b></u>${tags[i]}</br>`;
            }
        });
        return obj;
    }

    exportArchives() {
        this.loading = true;
        this.localStorageSrv.save('archive', this.searchForm.value);

        const newSearch = {
            company: null,
            storehouse: null,
            departament: null,
            doct: null,
            location: null,
            status: null,
            search: null,
            endDate: null,
            initDate: null,
        };

        this.searchForm.value.company ? newSearch.company = this.returnId('company') : null;
        this.searchForm.value.storehouse ? newSearch.storehouse = this.returnId('storehouse') : null;
        this.searchForm.value.departament ? newSearch.departament = this.returnId('departament') : null;
        this.searchForm.value.doct ? newSearch.doct = this.returnId('doct') : null;
        newSearch.location = this.searchForm.value.location;
        newSearch.status = this.searchForm.value.status;
        newSearch.search = this.searchForm.value.search;
        if (newSearch.search === null) {
            newSearch.search = '';
        }
        newSearch.endDate = this.searchForm.value.endDate;
        newSearch.initDate = this.searchForm.value.initDate;

        const searchValue = _.omitBy(newSearch, _.isNil);
        console.log(searchValue);
        this.archiveSrv.export(searchValue).subscribe(data => {
            this.loading = false;
        }, error => {
            this.loading = false;
            console.log('ERROR: ', error);
        });
    }

    open(content) {
        this.modalService.open(content, { backdrop: 'static' });
    }

    // showPdf(base64, name) {
    //     const linkSource = 'data:application/pdf;base64, ' + base64;
    //     const downloadLink = document.createElement('a');
    //     const fileName = name;

    //     downloadLink.href = linkSource;
    //     downloadLink.download = fileName;
    //     downloadLink.click();
    // }

    typeaheadKeydown() {
        if (!this.typeahead.isPopupOpen()) {
            return;
        }

        setTimeout(() => {
            const popup = document.getElementById(this.typeahead.popupId),
                activeElements = popup.getElementsByClassName('active');
            if (activeElements.length === 1) {
                const elem = <HTMLElement>activeElements[0];
                elem.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    }

    changeDate() {
        this.dateSent =
            new Date(this.dateSent).toISOString().slice(0, 10);

        console.log(this.dateSent);
        this.dateReceived = this.dateSent;
    }

    help() {
        this.introService.ListSimpleArchives();
    }
}

@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
        const keys = Object.keys(data);
        return keys.slice(keys.length / 2);
    }
}

