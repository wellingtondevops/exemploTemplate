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
    @Input() permissionEdit: any;
    @Input() permissionDelete: any;

    public radioGroupForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.radioGroupForm = this.formBuilder.group({
            model: 1
        });
    }

    permissionOfEdit(){
        var res: Boolean = false;
        for(var item in this.permissionEdit){
            JSON.parse(localStorage.getItem('profiles')).forEach(element => {
                if(element === this.permissionEdit[item]) {
                    res = true;
                    return;
                }
            });
        }
        return res;
    }

    permissionOfDelete(){
        var res: Boolean = false;
        for(var item in this.permissionDelete){
            JSON.parse(localStorage.getItem('profiles')).forEach(element => {
                if(element === this.permissionDelete[item]) {
                    res = true;
                    return;
                }
            });
        }
        return res;
    }

    editView() {
        this.edit.emit(this.id);
    }

    deleteItem() {
        this.delete.emit(this.id);
    }
}
