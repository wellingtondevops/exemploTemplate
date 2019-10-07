import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Masks } from 'src/app/utils/masks';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { PersonTypeEnum } from 'src/app/models/persontype.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { routerTransition } from 'src/app/router.animations';
import _ from 'lodash';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {
    companyForm: FormGroup;
    company: Company;
    personTypeList: any = [];
    hiddenCPF: Boolean = true;
    hiddenCNPJ: Boolean = true;
    departaments: any = [];
    id: string;
    public foneMask: Array<string | RegExp>;
    loading: Boolean = false;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        public mask: Masks,
        private companiesSrv: CompaniesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) {
        this.personTypeList = PersonTypeEnum;

        this.companyForm = this.fb.group({
            _id: this.fb.control(''),
            email: this.fb.control('', [Validators.required, Validators.email]),
            name: this.fb.control('', [Validators.required]),
            adress: this.fb.control('', [Validators.required]),
            province: this.fb.control('', [Validators.required]),
            city: this.fb.control('', [Validators.required]),
            fone: this.fb.control('', [Validators.required]),
            answerable: this.fb.control('', [Validators.required]),
            typePerson: this.fb.control('', [Validators.required]),
            cpf: this.fb.control(null),
            cnpj: this.fb.control(null),
            departaments: this.fb.array(this.departaments)
        });
    }

    get email() {
        return this.companyForm.get('email');
    }
    get name() {
        return this.companyForm.get('name');
    }
    get adress() {
        return this.companyForm.get('adress');
    }
    get province() {
        return this.companyForm.get('province');
    }
    get city() {
        return this.companyForm.get('city');
    }
    get fone() {
        return this.companyForm.get('fone');
    }
    get answerable() {
        return this.companyForm.get('answerable');
    }
    get typePerson() {
        return this.companyForm.get('typePerson');
    }
    get cnpj() {
        return this.companyForm.get('cnpj');
    }
    get cpf() {
        return this.companyForm.get('cpf');
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getCompany();
    }

    removeDepartament(e) {
        this.departaments.removeAt(e);
    }

    getCompany() {
        this.companiesSrv.company(this.id).subscribe(
            data => {
                console.log(data);
                this.loading = false;
                this.company = data;
                this.companyForm.patchValue({
                    _id: this.company._id,
                    departaments: this.company.departaments ? this.company.departaments : [],
                    name: this.company.name,
                    email: this.company.email,
                    adress: data.adress,
                    province: data.province,
                    city: data.city,
                    fone: data.fone,
                    typePerson: data.typePerson,
                    answerable: data.answerable,
                    cnpj: data.cnpj ? data.cnpj : null,
                    cpf: data.cpf ? data.cpf : null
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    createDepartament(): FormGroup {
        return this.fb.group({
            departamentName: '',
            company: this.company._id
        });
    }

    addDepartament(): void {
        this.departaments = this.companyForm.get('departaments') as FormArray;
        this.departaments.push(this.createDepartament());
    }

    updateCompany() {
        this.loading = true;
        var company = _.omitBy(this.companyForm.value, _.isNil);
        console.log(company);
        this.companiesSrv.updateCompany(company).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Empresa alterada com sucesso.');
                    this._route.navigate(['/companies']);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    typePersonChange() {
        switch (this.companyForm.value.typePerson) {
            case 'JURIDICA':
                this.hiddenCPF = true;
                this.hiddenCNPJ = false;
                this.companyForm.addControl('cnpj', new FormControl('', [Validators.required]));
                this.companyForm.addControl('cpf', new FormControl(null));
                break;
            case 'FISICA':
                this.hiddenCNPJ = true;
                this.hiddenCPF = false;
                this.companyForm.addControl('cpf', new FormControl('', [Validators.required]));
                this.companyForm.addControl('cnpj', new FormControl(null));
                break;
        }
    }
}
