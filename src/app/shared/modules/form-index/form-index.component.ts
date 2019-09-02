import { Component, OnInit, Input, Output, EventEmitter, Injectable, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'form-index',
    templateUrl: './form-index.component.html',
    styleUrls: ['./form-index.component.scss']
})
@Injectable()
export class FormIndexComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {}
}
