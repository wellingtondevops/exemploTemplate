import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-buttons-custom',
    templateUrl: './buttons-custom.component.html',
    styleUrls: ['./buttons-custom.component.scss']
})
@Injectable()
export class ButtonsCustomComponent implements OnInit {
    @Output() edit = new EventEmitter();
    @Output() delete = new EventEmitter();

    public radioGroupForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.radioGroupForm = this.formBuilder.group({
            model: 1
        });
    }

    editView(value) {
        this.edit.emit(value);
    }

    deleteItem(value) {
        this.delete.emit(value);
    }
}
