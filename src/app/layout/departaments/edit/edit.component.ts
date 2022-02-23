import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Departament } from 'src/app/models/departament';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    companies: any = [];
    id: string;
    public loading: Boolean = false;
    departament: Departament;
    departamentForm: FormGroup;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private departamentsSrv: DepartamentsService,
        private fb: FormBuilder,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,
    ) {
        this.departamentForm = this.fb.group({
            _id: this.fb.control(''),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            name: this.fb.control({ value: '' }, [Validators.required])
        });
    }

    ngOnInit() {
        // this.getCompanies();
        this.loading = true;
        this.id = this.route.snapshot.paramMap.get('id');
        this.getDepartament();
    }

    get companyIpt() {
        return this.departamentForm.get('company');
    }
    get name() {
        return this.departamentForm.get('name');
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

    getDepartament() {
        this.departamentsSrv.departament(this.id).subscribe(
            data => {
                this.loading = false;
                this.departament = data;
                this.departamentForm.patchValue({
                    _id: this.departament._id,
                    company: data.company,
                    name: data.name
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }


    returnId(object) {
        this.departamentForm.value[object] = _.filter(this.departamentForm.value[object], function (value, key) {
            if (key === '_id') {
                return value;
            }
        })[0];
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
                    res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        )

    updateDepartament() {
        this.returnId('company');
        this.loading = true;
        const departament = _.omitBy(this.departamentForm.value, _.isNil);
        this.departamentsSrv.update(departament).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Departamento alterada com sucesso.');
                    this._route.navigate(['/departaments/get', data._id]);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    help() {
        this.introService.EditDepartment();
    }
}
