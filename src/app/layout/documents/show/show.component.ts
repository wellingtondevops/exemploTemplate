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
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};

@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
    document: Document;
    loading: Boolean = true;
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
        private errorMsg: ErrorMessagesService,
        private modalService: NgbModal
    ) {
        this.loading = true;
        console.log(this.loading)
        this.documentForm = this.fb.group({
            _id: '',
            name: this.fb.control({value:'', disabled: true}, [Validators.required]),
            retention: this.fb.control({value:'', disabled: true}, [Validators.required]),
            retentionTime: this.fb.control({value:'', disabled: true}, [Validators.required]),
            label: this.fb.array(this.labels)
        });
        
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getDocument();
    }

    createLabel(item): FormGroup {
        return this.fb.group({
            namefield: {value: item.namefield, disabled: true},
            typeField: {value: item.typeField, disabled: true},
            uniq: {value: item.uniq, disabled: true}
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
                this.loading = false;
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    editDocument(document) {
        this._route.navigate(['/documents/edit', document]);
    }
    
    open(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Documento foi deletado com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o documento?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao documento serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }
    
    delete(document) {
        this.loading = true;
        this.documentSrv.delete(document).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Documento deletado com sucesso.');
                this._route.navigate(['/documents']);
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }
}
