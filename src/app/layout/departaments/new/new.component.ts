import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import _ from 'lodash';
import { routerTransition } from 'src/app/router.animations';
import { CaseInsensitive } from '../../../utils/case-insensitive'
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;

    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    companies: any = [];
    departamentForm: FormGroup;
    statusList: any = [];
    departaments: any = [];
    inputBlock: Boolean = false;
    hiddenReference: Boolean = true;
    loading: Boolean = false;

    constructor(
        private _route: Router,
        private departamentsSrv: DepartamentsService,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private fb: FormBuilder,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,

    ) {
        this.departamentForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            name: this.fb.control('', [Validators.required])
        });
    }

    formatter = (x: { name: string }) => x.name;

    get name() {
        return this.departamentForm.get('name');
    }
    get company() {
        return this.departamentForm.get('company');
    }

    ngOnInit() {
        this.getCompanies();
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


    returnId(object) {
        this.departamentForm.value[object] = _.filter(this.departamentForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
    }

    postDepartament() {
        this.returnId('company');

        const departament = _.omitBy(this.departamentForm.value, _.isNil);
        this.departamentsSrv.newDepartament(departament).subscribe(
            data => {
                if (data._id) {
                    this.successMsgSrv.successMessages('Departamento cadastrado com sucesso.');
                    this._route.navigate(['/departaments']);
                }
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

    help() {
        this.introService.NewDepartment();
    }

}
