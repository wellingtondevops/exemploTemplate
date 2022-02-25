import { ErrorMessagesService } from './../../../utils/error-messages/error-messages.service';
import { EmailServiceList } from './../../../models/email-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Page } from 'src/app/models/page';
import { EmailServiceService } from '../../../services/email-service/email-service.service';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { Router } from '@angular/router';
import { EmailsList } from 'src/app/models/email-service';
declare var $: any;
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    loading: Boolean = false;
    listFullEmails: any = [];
    emailsListFull: any = [];
    nameremet: any = [];
    notes: any;
    dateCreated: any;
    highlightValue: any;
    idArchive: any;
    id: any;
    pending: any;
    page = new Page();
    Email: EmailServiceList;
    emailsList: EmailsList = {
        items: []
    };


    constructor(
        private _route: Router,
        private emailSrv: EmailServiceService,
        private modalService: NgbModal,
        private errorMsg: ErrorMessagesService,
    ) { }

    ngOnInit() {
        this.getListDocFull();
    }

    getListDocFull(i = null) {
        this.loading = true;
        this.emailSrv.searchListEmails(this.page, null).subscribe(
            data => {
                this.emailsList = data;
                this.emailsListFull = this.emailsList.items.map(data => {
                    return data.title;
                });
                this.nameremet = this.emailsList.items.map(data => {
                    return data.userSernder.name;
                });
                this.notes = this.emailsList.items.map(data => {
                    return data.notes;
                });
                this.dateCreated = this.emailsList.items.map(data => {
                    return data.dateCreated;
                });
                this.highlightValue = this.emailsList.items.map(data => {
                    return data.highlighted;
                });
                this.idArchive = this.emailsList.items.map(data => {
                    return data.archive._id;
                });
                this.pending = this.emailsList.items.map(data => {
                    return data.archive.pending;
                });
                this.id = this.emailsList.items.map(data => {
                    return data._id;
                });
                // console.log('lista nova', this.id);
                this.loading = false;
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    openEmail(open) {
        this.modalService.open(open, { size: 'lg', windowClass: 'my-class' });
    }

    getAccessProfile(emailService, i) {
        this._route.navigate(['/email-service/get', emailService._id[i] ]);
    }
}
