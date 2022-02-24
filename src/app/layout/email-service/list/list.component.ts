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
    page = new Page();
    emailsList: EmailsList = {
        items: []
    };


    constructor(
        private _route: Router,
        private emailSrv: EmailServiceService

    ) { }

    ngOnInit() {
        this.getListDocFull();
    }

    getListDocFull() {
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
                console.log('lista nova', this.highlightValue);

            }
        );
        this.emailsListFull = this.listFullEmails.map(data => {
            return data.title;
        });
    }
}
