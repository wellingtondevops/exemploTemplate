import { Component, OnInit, Input, Output, EventEmitter, Injectable, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
    selector: 'app-form-index',
    templateUrl: './form-index.component.html',
    styleUrls: ['./form-index.component.scss']
})
@Injectable()
export class FormIndexComponent implements OnInit {
    data = {
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
    };

    constructor() {
    }

    ngOnInit() {}
    form = new FormGroup({});
    model = { email: 'email@gmail.com' };
    fields: FormlyFieldConfig[] = [{
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }];
  
    submit(model) {
      console.log(model);
    }
}
