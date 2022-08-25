import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, merge, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CompaniesList } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { routerTransition } from '../../../router.animations';
import _ from 'lodash';
import { BatchesService } from 'src/app/services/batches/batches.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    @ViewChild('instanceCompany', ) instanceCompany: NgbTypeahead;


    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    focusDepartament$ = new Subject<string>();
    clickDepartament$ = new Subject<string>();
    loading: Boolean = true;
    batchForm: FormGroup;
    companies: any = [];
    documents: any = [];
    departaments: any = [];


    constructor(
        private _route: Router,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private fb: FormBuilder,
        private batchsSrc: BatchesService,
        private utilCase: CaseInsensitive,
        private documentsSrv: DocumentsService,
        private introService: IntroJsService,
        private departamentsSrv: DepartamentsService,

    ) { }

    ngOnInit() {
        this.batchForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            doct: this.fb.control('', [Validators.required]),
            departament: this.fb.control('', [Validators.required]),
        });
        this.getCompanies();
    }

    formatter = (x: { name: string }) => x.name;

    get company() {
        return this.batchForm.get('company');
    }

    get doct() {
        return this.batchForm.get('doct');
    }
    get departament() {
        return this.batchForm.get('departament');
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
    getDepartament(id) {
        this.departamentsSrv.searchDepartaments(id).subscribe(
            data => {
                this.departaments = data.items;
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
    searchDepartament = (text$: Observable<string>) =>
    text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(departament =>
            departament.length < 2
                ? []
                : _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10)
        )
    )
    searchDocument = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(document =>
                document.length < 2
                    ? []
                    : _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10)
            )
        )



    selectedCompany(e) {
        this.getDocuments(e.item._id);
        this.getDepartament(e.item._id);
    }




    postBatch() {
        this.loading = true;
        let newForm = {
            company: this.batchForm.value.company ? this.returnId('company') : null,
            doct: this.batchForm.value.doct ? this.returnId('doct') : null,
            departament: this.batchForm.value.departament ? this.returnId('departament') : null
        };

        newForm = _.omitBy(newForm, _.isNil);

        this.batchsSrc.newBatch(newForm).subscribe(data => {
            if (data._id) {
                this.loading = false;
                this.successMsgSrv.successMessages('Lote cadastrado com sucesso.');
                this._route.navigate(['/batches/control', data._id]);
            }
        }, error => {
            this.loading = false;
            console.log('ERROR: ', error);
            this.errorMsg.errorMessages(error);
        });
    }

    returnId(object) {
        const result = _.filter(this.batchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
        return result;
    }

    help() {
        this.introService.NewBatches();
    }
}
