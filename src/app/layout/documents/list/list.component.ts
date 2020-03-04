import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { DocumentList } from 'src/app/models/document';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    searchForm: FormGroup;
    documents: DocumentList = {
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
        { name: 'Empresa', prop: 'company.name' },
        { name: 'Nome', prop: 'name' },
        { name: 'Retenção', prop: 'retention' },
        /* { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } } */
    ];
    loading: Boolean = true;

    constructor(
        private _route: Router,
        private documentSrv: DocumentsService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private fb: FormBuilder,
    ) { }

    ngOnInit() {
        this.setPage({ offset: 0 });
        // this.documentsList();
        this.searchForm = this.fb.group({
            name: this.fb.control(null),
        });
    }

    /* documentsList() {
        this.documentSrv.documents(null).subscribe(
            data => {
                this.loading = false;
                this.documents = data;
                this.page.pageNumber = data._links.currentPage;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    } */

    getDocuments() {
        this.setPageDocuments({ offset: 0 })
    }

    setPageDocuments(pageInfo) {
        this.loading = true
        this.page.pageNumber = pageInfo.offset;

        this.documentSrv.searchDocts(this.searchForm.value, this.page).subscribe(data => {
            this.page.pageNumber = data._links.currentPage - 1;
            this.page.totalElements = data._links.foundItems;
            this.page.size = data._links.totalPage;
            this.documents = data;
            this.loading = false;
        }, error => {
            console.log('ERROR: ', error)
            this.loading = false;
        });
    }

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;

        this.documentSrv.documents(this.page).subscribe(
            data => {
                this.loading = false;
                this.documents = data;
                this.page.pageNumber = data._links.currentPage - 1;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
                this.loading = false;
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    getDocument(document) {
        this._route.navigate(['/documents/get', document._id]);
    }
}
