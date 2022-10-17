import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { Component, OnInit } from '@angular/core';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { DocumentStructur, DocumentsStructurList } from 'src/app/models/document-structur';
import { Page } from 'src/app/models/page';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    documentsStructur: DocumentsStructurList = {
        _links: {
            currentPage: 0,
            foundItems: 0,
            next: '',
            self: '',
            totalPage: 0
        },
        items: []
    };
    page = new Page();
    loading: Boolean = true;
    columns = [
        { name: 'Nome', prop: 'structureName', width: 1150 },
        { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe }, width: 500 }
    ];
    permissionNew: boolean = false;

    constructor(
        private documentStructurSrv: DocumentsStructurService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private _route: Router,
        private introService: IntroJsService,
    ) { }

    ngOnInit() {
        this.setPageDocumentsStructur({ offset: 0 });
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write
    }

    getDocumentStructur(documentStructur) {
        this._route.navigate(['/documents-structur/get', documentStructur._id]);
    }

    setPageDocumentsStructur(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.documentStructurSrv.documentsStructur(this.page).subscribe(
            data => {
                console.log(data);
                this.documentsStructur = data;
                this.page.pageNumber = data._links.currentPage - 1;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
                this.loading = false;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    help() {
        this.introService.ListDocStructur();
    }
}
