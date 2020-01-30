import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { Storehouse } from 'src/app/models/storehouse';
import { debounceTime, distinctUntilChanged, map, reduce, tap, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { Router } from '@angular/router';
import { Page } from 'src/app/models/page';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    companies: any = [];
    volumeForm: FormGroup;
    storeHouses: any = [];
    volumeTypeList: any = [];
    guardTypeList: any = [];
    statusList: any = [];
    storeHouse: Storehouse;
    departaments: any = [];
    inputBlock: Boolean = false;
    hiddenReference: Boolean = true;
    loading: Boolean = true;
    page = new Page();

    constructor(
        private _route: Router,
        private storeHousesSrv: StorehousesService,
        private departamentsSrv: DepartamentsService,
        private volumesSrv: VolumesService,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private fb: FormBuilder
    ) {
        this.statusList = StatusVolumeEnum;
        this.volumeTypeList = VolumeTypeEnum;
        this.guardTypeList = GuardyTypeVolumeEnum;

        this.volumeForm = this.fb.group({
            storehouse: this.fb.control('', [Validators.required]),
            company: this.fb.control('', [Validators.required]),
            guardType: this.fb.control('', [Validators.required]),
            volumeType: this.fb.control('', [Validators.required]),
            departament: this.fb.control(null),
            uniqueField: this.fb.control(''),
            location: this.fb.control('', [Validators.required]),
            reference: this.fb.control(null)
        });
    }

    get description() {
        return this.volumeForm.get('description');
    }
    get location() {
        return this.volumeForm.get('location');
    }
    get volumeType() {
        return this.volumeForm.get('volumeType');
    }
    get guardType() {
        return this.volumeForm.get('guardType');
    }
    get storehouse() {
        return this.volumeForm.get('storehouse');
    }
    get departament() {
        return this.volumeForm.get('departament');
    }
    get reference() {
        return this.volumeForm.get('reference');
    }
    get company() {
        return this.volumeForm.get('company');
    }

    ngOnInit() {
        this.getCompanies();
        this.getStoreHouses();
    }

    blockInputs() {
        !this.inputBlock ? (this.inputBlock = true) : (this.inputBlock = false);
    }

    resetInputs() {
        if (this.inputBlock) {
            this.volumeForm.patchValue({
                location: '',
                reference: null
            });
            this.volumeForm.controls.location.setValidators([Validators.required]);
        } else {
            this.volumeForm.reset();
        }
    }

    returnUniqField() {
        return `${this.volumeForm.value.location}-${this.volumeForm.value.storehouse}`;
    }

    getCompanies() {
        this.companiesSrv.searchCompanies().subscribe(
            data => {
                this.companies = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    getStoreHouses() {
        this.storeHousesSrv.searchStorehouses().subscribe(
            data => {
                this.loading = false;
                this.storeHouses = data.items;
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    getDepartament(id) {
        this.departamentsSrv.searchDepartaments(id).subscribe(
            data => {
                this.departaments = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    changeGuardType() {
        switch (this.volumeForm.value.guardType) {
            case 'SIMPLES':
                this.hiddenReference = false;
                break;
            case 'GERENCIADA':
                this.hiddenReference = true;
                break;
        }
    }

    returnId(object) {
        this.volumeForm.value[object] = _.filter(this.volumeForm.value[object], function (value, key) {
            if (key === '_id') return value;
        })[0];
    }

    postVolume() {
        this.returnId('company');
        this.returnId('storehouse');
        this.returnId('departament');
        this.volumeForm.value.uniqueField = this.returnUniqField();
        var volume = _.omitBy(this.volumeForm.value, _.isNil);
        this.volumesSrv.newVolume(volume).subscribe(
            data => {
                if (data._id) {
                    this.successMsgSrv.successMessages('Volume cadastrado com sucesso.');
                    this.resetInputs();
                }
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(storehouse =>
                storehouse.length < 2
                    ? []
                    : _.filter(this.storeHouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10)
            )
        );

    formatter = (x: { name: string }) => x.name;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                var res;
                if (company.length < 2) {
                    res = [];
                } else {
                    res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
                    if (res[0]._id) {
                        this.getDepartament(res[0]._id);
                    }
                }
                return res;
            })
        );

    searchDepartament = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(departament => {
                let res;
                if (departament.length < 2) {
                    res = [];
                } else {
                    res = _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10)
                }
                return res;
            })
        );
}
@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
        const keys = Object.keys(data);
        return keys.slice(keys.length / 2);
    }
}
