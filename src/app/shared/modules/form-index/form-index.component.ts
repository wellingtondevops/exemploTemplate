import { Component, OnInit, Input, Output, EventEmitter, Injectable, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { Document } from '../../../models/document'

@Component({
    selector: 'app-form-index',
    templateUrl: './form-index.component.html',
    styleUrls: ['./form-index.component.scss']
})
@Injectable()
export class FormIndexComponent implements OnInit {
    @Input() data: Document;
    firstMoment = false;
    document: Document;
    form = new FormGroup({});
    model: any;
    fields: any;
    /* data = {
        "_links": {
            "self": "/docts/5d555a736f32e97b7bff60df"
        },
        "_id": "5d555a736f32e97b7bff60df",
        "name": "CONTRATOS IMOBILIARIOS",
        "retention": "ANOS",
        "retentionTime": 10,
        "__v": 0,
        "dateCreated": "2019-08-15T13:13:23.212Z",
        "label": [
            {
                "typeField": "TEXTO",
                "namefield": "NRO DO CONTRATO",
                "_id": "5d63df997e29026268176a83",
                "uniq": false
            },
            {
                "typeField": "TEXTO",
                "namefield": "RAZAO SOCIAL",
                "_id": "5d63df997e29026268176a82",
                "uniq": false
            },
            {
                "typeField": "DATA",
                "namefield": "DATA DE EMISSÃO",
                "_id": "5d63df997e29026268176a81",
                "uniq": false
            }
        ]
    }; */

    constructor() {
        console.log('data', this.data)
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes)
        if (!this.firstMoment) {
            this.firstMoment = true;
            // this.columns.push({ name: '', cellTemplate: this.showTmpl });
        }
        // tslint:disable-next-line:forin
        for (const propName in changes) {
            const change = changes[propName];
            this.document = change.currentValue;
            this.model = this.objectModel(this.document.label);
            this.fields = this.arrayLabelForm(this.document.label);
            // this.page.totalElements = change.currentValue._links.foundItems;
            // this.page.pageNumber = change.currentValue._links.currentPage;
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
            return {
                id: "formindex",
                key: element.namefield,
                type: this.typeInput(element.typeField),
                expressionProperties: {
                    "templateOptions.focus": (i) => {
                        if(i === 0) {
                            return true
                        }
                    },
                },
                templateOptions: {
                    label: element.namefield,
                    placeholder: element.namefield,
                    required: false,
                }
            }
        });
        return array
    }

    objectModel(labels){
        var newObj = {}
        labels.map(element => {
            newObj[element.namefield] = ''
        })
        return newObj
    }

    ngOnInit() { }
/*[{
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }];*/


    postArchive(model) {
        console.log('model', model)
        console.log(this.fields)
        console.log(this.model);
    }
}
