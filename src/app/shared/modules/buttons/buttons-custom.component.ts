import { Component, OnInit, Output, EventEmitter, Injectable, Input } from '@angular/core';
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
    @Input() id: string;
    @Input() permissionEdit = false;
    @Input() permissionDelete = false;
    @Input() isUser = false;

    public radioGroupForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.radioGroupForm = this.formBuilder.group({
            model: 1
        });
    }

    editView() {
        this.edit.emit(this.id);
    }

    deleteItem() {
        this.delete.emit(this.id);
    }
}
