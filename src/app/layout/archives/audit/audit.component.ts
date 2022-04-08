import { Router } from '@angular/router';
import { IntroJsService } from './../../../services/introJs/intro-js.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-audit',
    templateUrl: './audit.component.html',
    styleUrls: ['./audit.component.scss'],
    animations: [routerTransition()]

})
export class AuditComponent implements OnInit {
    loading: false;
    searchForm: FormGroup;
    getID: string;

    constructor(
        private fb: FormBuilder,
        private introService: IntroJsService,
        private _route: Router,
    ) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            id: this.fb.control('', [Validators.required, Validators.minLength(6)]),
        });
    }

    get id() {
        return this.searchForm.get('id');
    }

    help() {
        this.introService.ListSimpleArchives();
    }

    showData() {
        this.getID = this.searchForm.value.id;
        this._route.navigate(['/archives/audit/get', this.getID]);
    }
}
