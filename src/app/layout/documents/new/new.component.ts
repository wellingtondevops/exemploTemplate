import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { RedemptionEnum } from 'src/app/models/redemption.enum';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
    documentForm: FormGroup;
    labels: any = [];
    redemptionList: any = [];

    constructor(
        private _route: Router,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) {
        this.redemptionList = RedemptionEnum;

        this.documentForm = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            retention: this.fb.control('', [Validators.required]),
            retentionTime: this.fb.control('', [Validators.required]),
            label: this.fb.array(this.labels)
        });
    }

    ngOnInit() {}

    createLabel(): FormGroup {
        return this.fb.group({
            namefield: '',
            typeField: '',
            uniq: ''
        });
    }

    addLabel(): void {
        this.labels = this.documentForm.get('labels') as FormArray;
        this.labels.push(this.createLabel());
    }

    postDocument() {}
}
