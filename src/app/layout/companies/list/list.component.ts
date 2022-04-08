import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies/companies.service';
import { routerTransition } from '../../../router.animations';
import { CompaniesList } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from '../../../utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { AppState, getListCompanies, setListCompanies } from 'src/app/store/app.state';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    searchForm: FormGroup;
    companies: CompaniesList = {
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
        { name: 'Nome', prop: 'name', width: 700 },
        { name: 'E-mail', prop: 'email', width: 600 },
        { name: 'Telefone', prop: 'fone', width: 200 },
        { name: 'Criado em', prop: 'dateCreated', width: 135, pipe: { transform: this.pipes.datePipe } }
    ];
    loading: Boolean = true;
    permissionNew: boolean = false;



    constructor(
        private _route: Router,
        private companiesSrv: CompaniesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
        private introService: IntroJsService,
        private store: Store<{app: AppState}>,
    ) { }

    ListCompanies$ = this.store.select('app').pipe(
        map(app => app.companiesList)
    );

    ngOnInit() {
        this.store.dispatch(getListCompanies());
        this.searchForm = this.fb.group({
            name: this.fb.control(null, [Validators.required]),
        });
        const companies = JSON.parse(this.localStorageSrv.get('companies'));
        if (companies && companies.name) {
            this.searchForm.patchValue({
                name: companies.name
            });
        }
        // this.getCompanies();
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
    }

    get name() {
        return this.searchForm.get('name');
    }

    getCompany(company) {
        this._route.navigate(['/companies/get', company._id]);
    }

    getCompanies() {
        this.setPageCompanies({ offset: 0 });
    }

    setPageCompanies(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('companies', this.searchForm.value);
        const newForm = {
            name: this.searchForm.value.name ? this.searchForm.value.name : null,
        };

        this.companiesSrv.searchCompany(this.searchForm.value, this.page).subscribe(data => {
            this.page.pageNumber = data._links.currentPage - 1;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            this.companies = data;
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }

    /*     companiesList() {
            this.companiesSrv.companies(null).subscribe(
                data => {
                    this.loading = false;
                    this.companies = data;
                    this.page.pageNumber = data._links.currentPage;
                    this.page.totalElements = data._links.foundItems;
                    this.page.size = data._links.totalPage;
                },
                error => {
                    this.loading = false;
                    this.errorMsg.errorMessages(error);
                    console.log('ERROR:', error);
                }
            );
        } */

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;

        this.companiesSrv.searchCompany(this.searchForm.value, this.page).subscribe(data => {
            this.page.pageNumber = data._links.currentPage - 1;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            this.companies = data;
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }
    clear() {
        this.localStorageSrv.clear('companies');

        this.searchForm.patchValue({
            name: null
        });
    }

    help() {
        this.introService.ListCompany();
    }
}
