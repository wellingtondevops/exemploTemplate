import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../services/forgot-password/forgot-password.service';
import { SuccessMessagesService } from '../utils/success-messages/success-messages.service';
import { ErrorMessagesService } from '../utils/error-messages/error-messages.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
    resetPassForm: FormGroup;
    public loading: Boolean = false;

    constructor(
        private fb: FormBuilder,
        private fogotPasswordSrv: ForgotPasswordService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private modalService: NgbModal,
    ) { }

    ngOnInit() {
        this.loading = false;
        this.resetPassForm = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
        });
    }

    onResetPass(content) {
        this.loading = false;
        this.fogotPasswordSrv.forgotPassword(this.resetPassForm.value.email).subscribe(res => {
            //this.successMsgSrv.successMessages(res);
            this.loading = false;
            this.modalService.open(content);
        }, error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }

}
