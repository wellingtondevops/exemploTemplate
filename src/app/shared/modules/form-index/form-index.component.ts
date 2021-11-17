import { Component, Input, EventEmitter, Injectable, SimpleChanges, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Document } from '../../../models/document';
import { Archive } from 'src/app/models/archive';
import { isArray } from 'util';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';

declare var $: any;

@Component({
    selector: 'app-form-index',
    templateUrl: './form-index.component.html',
    styleUrls: ['./form-index.component.scss']
})
@Injectable()
export class FormIndexComponent {
    @Input() data: Document;
    @Input() store: any;
    @Input() isArchive: Boolean = false;
    @Input() edit: Boolean = false;
    @Input() multipleIndex: Boolean = false;
    @Output() sendArchive = new EventEmitter();
    firstMoment: Boolean = false;
    document: Document;
    archive: Archive;
    form = new FormGroup({});
    model: any;
    fields: any;

    constructor() {
    }
    ngOnInit(){
        if (this.store && this.document.label) {
            this.model = this.objectModel(this.document.label, this.store);
            this.fields = this.arrayLabelForm(this.document.label, this.store);
        }
        $(document).ready(function() {
            $('#worksheets').autocomplete({
                source:  async function(request, response) {
                    let data = await fetch(`https://archiomain.archio.com.br/batches/6171c77bc885a50014dd4a8a/search?term=${request.term}` )
                    .then(results => results.json())
                    .then(results => results.map(result => {
                        return {label: result.fieldColumns, value: result.fieldColumns, id: result._id};
                    }));
                    response(data);
                },
                select: function(event, ui, i) {
                    fetch(`https://archiomain.archio.com.br/worksheets/${ui.item.id}`)
                    .then(result => result.json())
                    .then(result => {
                        result.fieldColumns.forEach(fieldColumn =>{
                            $('<input/>').text(`${fieldColumn}`).append(`#formindex${i}`);
                        });
                    });
                }
            });
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        // tslint:disable-next-line:forin
        for (const propName in changes) {
            if (!this.isArchive) {
                const change = changes[propName];
                if (propName === 'data') {
                    this.document = change.currentValue;
                    this.model = this.objectModel(this.document.label, null);
                    this.fields = this.arrayLabelForm(this.document.label, null);
                }
                if (propName === 'store') {
                    console.log('change store')
                    if (this.store && this.document.label) {
                        this.model = this.objectModel(this.document.label, this.store);
                        this.fields = this.arrayLabelForm(this.document.label, this.store);
                    }
                }
            } else {
                const change = changes[propName];
                this.archive = change.currentValue;
                if (this.archive && this.archive.doct) {
                    this.model = this.objectModel(this.archive.doct.label, this.archive.tag);
                    this.fields = this.arrayLabelForm(this.archive.doct.label, this.archive.tag);
                }

            }
        }
    }

    typeInput(element) {
        let type = 'input';
        switch (element) {
            case 'DATA':
                type = 'input';
                break;
            case 'TEXTO':
                type = 'input';
                break;
        }
        return type;
    }

    arrayLabelForm(labels, tag,) {
        const array = labels.map((element, i) => {
            const value = tag ? tag[i] : '';
            const result = {
                id: `formindex${i}`,
                key: element.namefield,
                type: this.typeInput(element.typeField),
                defaultValue: value,
                uniq : element.uniq,
                    templateOptions: {
                    label: element.namefield,
                    placeholder: element.namefield,
                    required: element.uniq,
                    disabled: !this.edit ? true : false,
                    keydown: (field, e) => {
                        if (e.which === 13) {
                            const number = i + 1;
                            document.getElementById(`formindex${number}`).focus();
                            e.preventDefault();
                        }
                    }
                }
            };
            if (i == 0) {
                result['focus'] = true;
            }
            return result;
        });
        return array;
    }

    objectModel(labels, tag) {
        const newObj = {};
        labels.map((element, i) => {
            newObj[element.namefield] = tag ? tag[i] : '';
        });
        return newObj;
    }

    postArchive(model) {
        this.sendArchive.emit(model);
    }

    submit() {
        if (this.form.valid) {
            alert(JSON.stringify(this.model));
        }
    }
}
