import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { EmailServiceList } from 'src/app/models/email-service';
import { EmailServiceService } from './../../../services/email-service/email-service.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
    loading: Boolean = true;
    id: string;
    Email: EmailServiceList;
    notes: string;
    dateCreated: string;
    sender: string;
    title: string;
    archiveId: string;

    constructor(
        private route: ActivatedRoute,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private emailSrv: EmailServiceService,
        private errorMsg: ErrorMessagesService,
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getEmail();
    }

    getEmail() {
        this.emailSrv.showEmail(this.id).subscribe(data => {
            this.loading = false;
            this.Email = data;
            this.id = data._id;
            this.notes = data.notes;
            this.sender = data.userSernder.name;
            this.dateCreated = data.dateCreated;
            this.title = data.title;
            this.archiveId = data.archive._id;

            console.log('lista nova', this.id);
        },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

}
