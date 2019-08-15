import { Component, OnInit, PipeTransform, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { RedemptionEnum } from 'src/app/models/redemption.enum';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { routerTransition } from 'src/app/router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    loading: Boolean = false;
    documentForm: FormGroup;
    labels: any = [];
    public retentionList: any = RedemptionEnum;
    public typeFieldList: any = TypeFieldListEnum;

    constructor(
        private _route: Router,
        private fb: FormBuilder,
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

    ngOnInit() {}

    createLabel(): FormGroup {
        return this.fb.group({
            namefield: '',
            typeField: '',
            uniq: ''
        });
    }

    addLabel(): void {
        this.labels = this.documentForm.get('label') as FormArray;
        this.labels.push(this.createLabel());
    }

    removeLabel(e) {
        this.labels.removeAt(e);
    }

    postDocument() {
        this.loading = true;
        this.documentSrv.newDocument(this.documentForm.value).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Documento cadastrado com sucesso.');
                    this._route.navigate(['/documents']);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}
@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
        const keys = Object.keys(data);
        return keys.slice(keys.length / 2);
    }
}
