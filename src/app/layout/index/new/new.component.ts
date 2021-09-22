import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'src/app/models/page';
import { routerTransition } from 'src/app/router.animations';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { Document } from 'src/app/models/document';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { SaveLocal } from '../../../storage/saveLocal';
import _ from 'lodash';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    public loading: Boolean = false;
    id: string;
    page = new Page();
    dataPosition: any;
    image: any;
    document: Document;
    checkboxForm: FormArray;
    items: FormArray;
    valuesStorage: any;

    constructor(
        private route: ActivatedRoute,
        private batchesSrv: BatchesService,
        private documentSrv: DocumentsService,
        private fb: FormBuilder,
        private saveLS: SaveLocal,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
    ) { }


    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.getImagesByBatches();


    }

    ngOnDestroy() {

    }

    getImagesByBatches() {
        this.page.pageNumber = 1
        this.batchesSrv.batch(this.id,).subscribe(data => {
            this.dataPosition = data
            this.getDocument()
        }, error => {
            console.log('ERROR: ', error);
        });
        this.batchesSrv.imagens(this.id, this.page, 1).subscribe(data => {
            this.image = data.items[0]
        }, error => {
            console.log('ERROR: ', error);
        })
    }

    getDocument() {
        this.documentSrv.document(this.dataPosition.doct._id).subscribe(data => {
            this.document = data;
            this.valuesStorage = JSON.parse(this.saveLS.get(this.id));
            if (this.document.label) {
                var items = []
                this.document.label.map((item, key) => {
                    items.push(new FormControl())
                })

                if (this.valuesStorage) {
                    items = []
                    this.valuesStorage.map((item, i) => {
                        items.push(new FormControl(item))
                    })
                }
                this.checkboxForm = new FormArray(items)
            }
        }, error => {
            console.log('ERROR: ', error)
        })
    }

    createItem(): FormGroup {
        return this.fb.group({
            checkbox: '',
        });
    }

    addItem(): void {
        this.items = this.checkboxForm.get('items') as FormArray;
        this.items.push(this.createItem());
    }

    createDocument(data) {
        this.loading = true;

        const valueCheckBox = _.values(this.checkboxForm.value)
        const tag = _.values(data);
        let memoryInput = [];
        valueCheckBox.map((item, i) => {
            if (item) {
                memoryInput.push(tag[i]);
            } else {
                memoryInput.push('')
            }
        })

        this.saveLS.save(this.id, memoryInput);

        this.batchesSrv.batchIndex(this.id, {picture: this.image._id, tag: tag}).subscribe(data => {
            if (data._id) {
                this.successMsgSrv.successMessages('Arquivo alterado com sucesso.');
                this.getImagesByBatches()
                this.loading = false;
                // this._route.navigate(['/archives/get', data._id]);
            }
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        });
    }

}
