import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { UsersService } from '../../../services/users/users.service';
import { UserList } from '../../../models/user';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { NgbdModalConfirmComponent } from '../../../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Page } from 'src/app/models/page';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    public isCollapsed = false;
    users: UserList = {
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
        { name: 'Nome', prop: 'name' },
        { name: 'E-mail', prop: 'email' },
        { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
    ];

    constructor(
        private usersSrv: UsersService,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private modalService: NgbModal,
        public modal: NgbActiveModal
    ) {}

    ngOnInit() {
        // this.usersList();
        this.setPage({ offset: 0 })
    }

    /* usersList() {
        this.usersSrv.users(null).subscribe(
            data => {
                this.loading = false;
                this.users = data;
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

    getUser(user) {
        this._route.navigate(['/users/get', user]);
    }

    setPage(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;

        this.usersSrv.users(this.page).subscribe(
            data => {
                this.users = data;
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
}
