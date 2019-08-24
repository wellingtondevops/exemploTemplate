import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies/companies.service';
import { routerTransition } from '../../../router.animations';
import { CompaniesList } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pipes } from '../../../utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
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
        { name: 'Nome', prop: 'name' },
        /*{ name: 'CPF/CNPJ', prop: 'cpfCnpj' },*/
        { name: 'E-mail', prop: 'email' },
        { name: 'Telefone', prop: 'fone' },
        { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
    ];
    loading: Boolean = true;

    constructor(
        private _route: Router,
        private companiesSrv: CompaniesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes
    ) {}

    ngOnInit() {
        this.companiesList();
    }

    getCompany(company) {
        this._route.navigate(['/companies/get', company]);
    }

    companiesList() {
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
    }

    setPage(pageInfo) {
        this.page.pageNumber = pageInfo.offset;

        this.companiesSrv.companies(this.page).subscribe(data => {
            this.page.pageNumber = data._links.currentPage;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            this.companies = data;
        });
    }
}
