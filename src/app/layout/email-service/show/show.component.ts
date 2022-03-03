import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { EmailServiceList } from 'src/app/models/email-service';
import { EmailServiceService } from './../../../services/email-service/email-service.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
    loading: Boolean = false;
    id: string;
    Email: EmailServiceList;
    notes: string;
    dateCreated: string;
    sender: string;
    title: string;
    archiveId: string;
    pending: Boolean;
    permissionDelete = false;

    constructor(
        private route: ActivatedRoute,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private emailSrv: EmailServiceService,
        private errorMsg: ErrorMessagesService,
        private introService: IntroJsService,
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getEmail();
    }


    getEmail() {
        this.loading = true;
        this.emailSrv.showEmail(this.id).subscribe(data => {
            this.Email = data;
            this.id = data._id;
            this.notes = data.notes;
            this.sender = data.userSernder.name;
            this.dateCreated = data.dateCreated;
            this.title = data.title;
            this.archiveId = data.archive._id;
            this.pending = data.archive.pending;
            // console.log('lista nova', this.pending);
            this.loading = false;
        },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    open(name: string, file) {
        const modalRef = this.modalService.open(MODALS[name], {
            keyboard: false, backdrop: 'static', windowClass: 'modal-style',
        });
        modalRef.componentInstance.item = file;
        modalRef.componentInstance.data = {
            titleModal: 'Deletar Arquivo',
            msgConfirmDelete: 'Arquivo foi deletada com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o arquivo?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao arquivo serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }

    delete(file) {
        this.emailSrv.delete(this.id).subscribe(res => {
            this.successMsgSrv.successMessages('Arquivo deletado com sucesso.');
            this._route.navigate(['/email-service']);
        }, error => {
            console.log(error);
            this.errorMsg.errorMessages(error);
        });
    }

    help(): void {
        this.introService.ShowEmails();
    }
}
