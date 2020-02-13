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
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
    companyForm: FormGroup;
    company: Company;
    personTypeList: any = [];
    hiddenCPF: Boolean = true;
    hiddenCNPJ: Boolean = true;
    departaments: any = [];
    id: string;
    changeUp = false;
    public foneMask: Array<string | RegExp>;
    public loading: Boolean = true;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        public mask: Masks,
        private companiesSrv: CompaniesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private modalService: NgbModal
    ) {
        this.personTypeList = PersonTypeEnum;

        this.companyForm = this.fb.group({
            _id: this.fb.control(''),
            email: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
            name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            adress: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            province: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            city: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            fone: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            answerable: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            typePerson: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            cpf: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            cnpj: this.fb.control({ value: '', disabled: true }, [Validators.required]),
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
                if(data.cnpj) {
                    this.hiddenCNPJ = false
                }
                if(data.cpf) {
                    this.hiddenCPF = false
                }
                /* this.company.departaments.map(item => {
                    this.addDepartament(item);
                }); */
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    changeUpdate() {
        !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
        if (this.changeUp) {
            this.companyForm.reset({
                _id: this.company._id,
                name: { value: this.company.name, disabled: false },
                email: { value: this.company.email, disabled: false },
                province: { value: this.company.province, disabled: false },
                adress: { value: this.company.adress, disabled: false },
                city: { value: this.company.city, disabled: false },
                fone: { value: this.company.fone, disabled: false },
                answerable: { value: this.company.answerable, disabled: false },
                typePerson: { value: this.company.typePerson, disabled: false },
                cnpj: { value: this.company.cnpj ? this.company.cnpj : null, disabled: false },
                cpf: { value: this.company.cpf ? this.company.cpf : null, disabled: false },
                dateCreated: { value: moment(this.company.dateCreated).format('YYYY-MM-DD'), disabled: true }
            });
        }
    }

    createDepartament(item): FormGroup {
        return this.fb.group({
            departamentName: item.departamentName,
            company: item.company
        });
    }

    addDepartament(item): void {
        this.departaments = this.companyForm.get('departaments') as FormArray;
        this.departaments.push(this.createDepartament(item));
    }

    updateCompany() {
        this.loading = true;
        const company = _.omitBy(this.companyForm.value, _.isNil);
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

    editCompany(company) {
        this._route.navigate(['/companies/edit', company]);
    }

    open(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Empresa foi deletada com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar a empresa?',
            msgQuestionDeleteTwo: 'Todas as informações associadas a empresa serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }

    delete(company) {
        this.loading = true;
        this.companiesSrv.delete(company).subscribe(
            response => {
                this.loading = false;
                this.successMsgSrv.successMessages('Empresa deletada com sucesso.');
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }
}
