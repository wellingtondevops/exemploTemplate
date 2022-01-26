import { SaveLocal } from 'src/app/storage/saveLocal';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    loading: Boolean = false;
    permissionNew: Boolean = true;
    profileForm: FormGroup;


    constructor(
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
    ) { }

    ngOnInit() {
        this.profileForm = this.fb.group({
            company: this.fb.control(null, Validators.required),
            name: this.fb.control(null)
        });
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
    }

    get company() {
        return this.profileForm.get('company');
    }

    get profile() {
        return this.profileForm.get('name');
    }

}
