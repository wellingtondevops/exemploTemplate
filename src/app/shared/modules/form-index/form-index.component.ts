import { Component, Input, EventEmitter, Injectable, SimpleChanges, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Document } from '../../../models/document'
import { Archive } from 'src/app/models/archive';
import { isArray } from 'util';

@Component({
    selector: 'app-form-index',
    templateUrl: './form-index.component.html',
    styleUrls: ['./form-index.component.scss']
})
@Injectable()
export class FormIndexComponent {
    @Input() data: Document;
    @Input() isArchive: Boolean;
    @Output() sendArchive = new EventEmitter();
    firstMoment = false;
    document: Document;
    archive: Archive;
    form = new FormGroup({});
    model: any;
    fields: any;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.firstMoment) {
            this.firstMoment = true;
        }
        // tslint:disable-next-line:forin
        for (const propName in changes) {
            if (!this.isArchive) {
                const change = changes[propName];
                this.document = change.currentValue;
                this.model = this.objectModel(this.document.label, null);
                this.fields = this.arrayLabelForm(this.document.label, null);
            } else {
                console.log('else')
                const change = changes[propName];
                this.archive = change.currentValue;
                this.model = this.objectModel(this.archive.doct.label, this.archive.tag);
                this.fields = this.arrayLabelForm(this.archive.doct.label, this.archive.tag);
            }
        }
    }

    typeInput(element) {
        var type = 'input'
        switch (element) {
            case 'DATA':
                type = 'input'
                break
            case 'TEXTO':
                type = 'input'
                break
        }
        return type
    }

    arrayLabelForm(labels, tag) {
        var array = labels.map((element, i) => {
            var value = tag ? tag[i] : '';
            var result = {
                id: `formindex${i}`,
                key: element.namefield,
                type: this.typeInput(element.typeField),
                defaultValue: value,
                templateOptions: {
                    label: element.namefield,
                    placeholder: element.namefield,
                    required: false,
                    disabled: value ? true : false,
                    keydown: (field, e) => {
                        if (e.which === 13) {
                            var number = i + 1
                            document.getElementById(`formindex${number}`).focus();
                            e.preventDefault();
                        }
                    }
                }
            }
            if (i == 0) {
                result['focus'] = true;
            }
            console.log('result', result)
            return result
        });
        return array
    }

    objectModel(labels, tag) {
        var newObj = {}
        labels.map((element, i) => {
            newObj[element.namefield] = tag ? tag[i] : ''
        })
        return newObj
    }

    postArchive(model) {
        this.sendArchive.emit(model);
    }
}
