import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {
    id: String;
    storeHouse: any;
    storeHouseForm: FormGroup;
    mapHouseForm: FormGroup;
    changeUp = false;
    loading: Boolean = true;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private storeHouseSrv: StorehousesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private introService: IntroJsService,
    ) { }

    get name() {
        return this.storeHouseForm.get('name');
    }

    ngOnInit() {
        this.storeHouseForm = this.fb.group({
            _id: '',
            name: this.fb.control('', [Validators.required]),
            mapStorehouse: this.fb.control({ value: '', enabled: true }),
        });

        this.id = this.route.snapshot.paramMap.get('id');
        this.getStoreHouse();
    }

    getStoreHouse() {
        this.storeHouseSrv.storehouse(this.id).subscribe(
            data => {
                this.loading = false;
                this.storeHouse = data;
                this.storeHouseForm.patchValue({
                    _id: this.storeHouse._id,
                    name: data.name,
                    mapStorehouse: data.mapStorehouse,
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    updateStoreHouse() {
        this.loading = true;
        this.storeHouseSrv.updateStoreHouse(this.storeHouseForm.value).subscribe(
            data => {
                this.loading = false;
                this.storeHouse = data;
                this.storeHouseForm.reset({
                    _id: this.storeHouse._id,
                    name: { value: this.storeHouse.name, disabled: true }
                });
                this.successMsgSrv.successMessages('Depósito alterado com sucesso.');
                this._route.navigate(['/storehouses/get', data._id], { skipLocationChange: true });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    help() {
        this.introService.EditStoreHouse();
    }
}
