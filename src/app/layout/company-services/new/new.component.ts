import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { CompanyServicesService } from 'src/app/services/company-services/company-services.service';
import { CurrencyPipe } from '@angular/common';
import { Masks } from 'src/app/utils/masks';
import { MenuService } from 'src/app/services/menu-services/menu-services.service';
import { MenuList } from 'src/app/models/menu';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

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
    companyservice: Object;
    serviceForm: FormGroup;
    profilesList: any = [];
    loading: Boolean = false;
    companies: any = [];
    documentsAll: any = [];
    searchSubscribe = '';
    services: any = [];
    userExternal = false;
    menuServices: any = [];
    // public mask = [/[1-4]/, /\d/, /\d/, /\d/, ',',/\d/,/\d/]

    constructor(
        private mask: Masks,
        private _route: Router,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private companyServiceSrv: CompanyServicesService,
        private currencyPipe: CurrencyPipe,
        private menuSrv: MenuService,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,
    ) {
    }

    ngOnInit() {
        this.serviceForm = this.fb.group({
            company: this.fb.control('', [Validators.required]),
            services: this.fb.array(this.services)
        });
        this.getCompanies();
        this.addService();
        this.getMenuServices();
    }

    get company() {
        return this.serviceForm.get('company');
    }

    createService(): FormGroup {
        return this.fb.group({
            description: '',
            price: ''
        });
    }

    addService(): void {
        this.services = this.serviceForm.get('services') as FormArray;
        this.services.push(this.createService());
    }

    removeService(e) {
        this.services.removeAt(e);
    }

    formatter = (x: { name: string }) => x.name;

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

    returnFormatCompanyServices() {
        this.serviceForm.value.company = this.serviceForm.value.company._id;
        const newArray = [];
        this.serviceForm.value.services.map((item) => {
            let priceStr = item.price.replace(',', '.');
            priceStr = priceStr.replace('R$', '');
            const priceFloat = parseFloat(priceStr);
            newArray.push({ description: item.description, price: priceFloat });
        });
        this.serviceForm.value.services = newArray;
    }

    formatterMenuService = (x: { descriptionService: string }) => x.descriptionService;

    getMenuServices() {
        this.menuSrv.listSelect().subscribe(data => {
            this.menuServices = data.items;
        }, error => {
            console.log('ERROR: ', error);
        });
    }

    searchMenu = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(menu => {
                let res;
                if (menu.length < 2) { []; } else { res = _.filter(this.menuServices, v => v.descriptionService.toLowerCase().indexOf(menu.toLowerCase()) > -1).slice(0, 10); }
                return res;
            })
        )

    postCompanyService() {
        this.loading = true;
        this.returnFormatCompanyServices();

        this.companyServiceSrv.newService(this.serviceForm.value).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Serviço Empresarial cadastrado com sucesso.');
                    this._route.navigate(['/company-services']);
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
        this.introService.NewCompServices();
    }
}
