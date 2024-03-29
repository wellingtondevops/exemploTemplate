import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Router } from '@angular/router';
// import { forbiddenNameValidator } from '../../../shared/forbidden-name.directive';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    storeHouse: Object;
    storeHouseForm: FormGroup;
    mapHouseForm: FormGroup;
    loading: Boolean = false;

    constructor(
        private storeHouseSrv: StorehousesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private _route: Router
    ) {}

    ngOnInit() {
        this.storeHouseForm = this.fb.group({
            name: this.fb.control('', [Validators.required]),
            mapStorehouse: this.fb.control({value:'', enabled: true }),


        });
    }

    get name() {
        return this.storeHouseForm.get('name');
    }


    postStoreHouse() {
        this.loading = true;
        this.storeHouseSrv.newStoreHouse(this.storeHouseForm.value).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.storeHouseForm = this.fb.group({
                        name: this.fb.control('', [Validators.required]),


                    });
                    this.successMsgSrv.successMessages('Depósito cadastrado com sucesso.');
                    this._route.navigate(['/storehouses']);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}
