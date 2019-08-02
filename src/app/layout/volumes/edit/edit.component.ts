import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Storehouse } from 'src/app/models/storehouse';
import { ActivatedRoute } from '@angular/router';
import { Volume } from 'src/app/models/volume';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {
    companies: any = [];
    volumeForm: FormGroup;
    company: Company;
    storeHouses: any = [];
    volumeTypeList: any = [];
    guardTypeList: any = [];
    storeHouse: Storehouse;
    departaments: any = [];
    statusList: any = [];
    id: String;
    volume: Volume;
    hiddenReference: Boolean = true;

    constructor(
        private route: ActivatedRoute,
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
            _id: this.fb.control(''),
            storehouse: this.fb.control('', [Validators.required]),
            company: this.fb.control('', [Validators.required]),
            description: this.fb.control('', [Validators.required]),
            guardType: this.fb.control('', [Validators.required]),
            volumeType: this.fb.control('', [Validators.required]),
            departament: this.fb.control('', [Validators.required]),
            uniqueField: this.fb.control(''),
            location: this.fb.control('', [Validators.required]),
            reference: this.fb.control('')
        });
    }

    ngOnInit() {
        this.getCompanies();
        this.getStoreHouses();

        this.id = this.route.snapshot.paramMap.get('id');
        this.getVolume();
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
    get companyInput() {
        return this.volumeForm.get('company');
    }

    getVolume() {
        this.volumesSrv.volume(this.id).subscribe(
            data => {
                this.volume = data;
                this.volumeForm.patchValue({
                    _id: this.volume._id,
                    departament: this.volume.departament ? this.volume.departament.name : null,
                    storehouse: this.volume.storehouse,
                    company: data.company,
                    description: data.description,
                    guardType: data.guardType,
                    volumeType: data.volumeType,
                    uniqueField: data.uniqueField,
                    location: data.location,
                    status: data.status
                });
                this.changeGuardType();
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    returnUniqField() {
        return `${this.volumeForm.value.location}-${this.volumeForm.value.company}`;
    }

    getCompanies() {
        this.companiesSrv.companies(null).subscribe(
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
        this.storeHousesSrv.storeHouses(null).subscribe(
            data => {
                this.storeHouses = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    getDepartament(id) {
        this.departamentsSrv.departaments(null, id).subscribe(
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
        this.volumeForm.value[object] = _.filter(this.volumeForm.value[object], function(value, key) {
            if (key === '_id') return value;
        })[0];
    }

    updateVolume() {
        this.returnId('company');
        this.returnId('storehouse');

        this.volumeForm.value.uniqueField = this.returnUniqField();

        this.volumesSrv.updateVolume(this.volumeForm.value).subscribe(
            data => {
                if (data._id) {
                    this.successMsgSrv.successMessages('Volume cadastrado com sucesso.');
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

    formatterDepartament = (x: { departamentName: string }) => x.departamentName;
    formatter = (x: { name: string }) => x.name;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                var res;
                if (company.length < 2) [];
                else var res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
                this.getDepartament(this.volumeForm.value.company._id);
                return res;
            })
        );

    searchDepartament = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(departament =>
                departament.length < 2
                    ? []
                    : _.filter(this.departaments, v => v.departamentName.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10)
            )
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
