import { Component, Input, EventEmitter, Injectable, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Document } from '../../../models/document'

@Component({
    selector: 'app-form-index',
    templateUrl: './form-index.component.html',
    styleUrls: ['./form-index.component.scss']
})
@Injectable()
export class FormIndexComponent {
    @Input() data: Document;
    firstMoment = false;
    document: Document;
    form = new FormGroup({});
    model: any;
    fields: FormlyFieldConfig[];

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.firstMoment) {
            this.firstMoment = true;
        }
        // tslint:disable-next-line:forin
        for (const propName in changes) {
            const change = changes[propName];
            this.document = change.currentValue;
            this.model = this.objectModel(this.document.label);
            this.fields = this.arrayLabelForm(this.document.label);
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

    arrayLabelForm(labels) {
        var array = labels.map((element, i) => {
            var result = {
                id: `formindex${i}`,
                key: `formindex${i}`,
                type: this.typeInput(element.typeField),
                templateOptions: {
                    label: element.namefield,
                    placeholder: element.namefield,
                    required: false,
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
            return result
        });
        return array
    }

    objectModel(labels) {
        var newObj = {}
        labels.map(element => {
            newObj[element.namefield] = ''
        })
        return newObj
    }

    postArchive(model) {
        console.log('model', model)
        console.log(this.fields)
        console.log(this.model);
    }
}
