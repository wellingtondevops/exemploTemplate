import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { RedemptionEnum } from 'src/app/models/redemption.enum';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Document } from 'src/app/models/document';
import { routerTransition } from 'src/app/router.animations';

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
    document: Document;
    loading: Boolean = false;
    documentForm: FormGroup;
    labels: any = [];
    id: string;
    public retentionList: any = RedemptionEnum;
    public typeFieldList: any = TypeFieldListEnum;

    constructor(
        private _route: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private documentSrv: DocumentsService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) {
        this.documentForm = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            retention: this.fb.control('', [Validators.required]),
            retentionTime: this.fb.control('', [Validators.required]),
            label: this.fb.array(this.labels)
        });
    }

    get name() {
        return this.documentForm.get('name');
    }
    get retentionTime() {
        return this.documentForm.get('retentionTime');
    }
    get retention() {
        return this.documentForm.get('retention');
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getDocument();
    }

    createLabel(item): FormGroup {
        return this.fb.group({
            namefield: item.namefield,
            typeField: item.typeField,
            uniq: item.uniq
        });
    }

    addLabel(item): void {
        this.labels = this.documentForm.get('label') as FormArray;
        this.labels.push(this.createLabel(item));
    }

    removeDepartament(e) {
        this.labels.removeAt(e);
    }

    getDocument() {
        this.loading = true;
        this.documentSrv.document(this.id).subscribe(
            data => {
                console.log(data);
                this.loading = false;
                this.document = data;
                this.documentForm.patchValue({
                    _id: this.document._id,
                    label: this.document.label ? this.document.label : [],
                    name: this.document.name,
                    retention: this.document.retention,
                    retentionTime: this.document.retentionTime
                });
                this.document.label.map(item => {
                    this.addLabel(item);
                });
                console.log(this.labels);
                console.log(this.documentForm.value.label.control);
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }
}
