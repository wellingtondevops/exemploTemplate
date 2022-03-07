import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Storehouse } from 'src/app/models/storehouse';
import { ActivatedRoute, Router } from '@angular/router';
import { Volume } from 'src/app/models/volume';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';

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
    loading: Boolean = true;

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private storeHousesSrv: StorehousesService,
        private departamentsSrv: DepartamentsService,
        private volumesSrv: VolumesService,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private fb: FormBuilder,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,
    ) {
        this.statusList = StatusVolumeEnum;
        this.volumeTypeList = VolumeTypeEnum;
        this.guardTypeList = GuardyTypeVolumeEnum;

        this.volumeForm = this.fb.group({
            _id: this.fb.control(''),
            storehouse: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            guardType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            volumeType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            departament: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            uniqueField: this.fb.control(''),
            location: this.fb.control('', [Validators.required]),
            reference: this.fb.control(''),
            closeBox: this.fb.control('', [Validators.required])
        });
    }

    ngOnInit() {
        this.getCompanies();
        this.getStoreHouses();
        this.loading = true;

        this.id = this.route.snapshot.paramMap.get('id');
        this.getVolume();
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
                this.loading = false;
                this.volume = data;
                this.volumeForm.patchValue({
                    _id: this.volume._id,
                    departament: this.volume.departament,
                    storehouse: this.volume.storehouse,
                    company: data.company,
                    guardType: data.guardType,
                    volumeType: data.volumeType,
                    uniqueField: data.uniqueField,
                    location: data.location,
                    status: data.status,
                    closeBox: data.closeBox,
                });
                this.changeGuardType();
                this.getDepartament(data.company._id);
            },
            error => {
                this.loading = false;
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
            if (key === '_id') { return value; }
        })[0];
    }

    updateVolume() {
        this.loading = true;
        this.returnId('company');
        this.returnId('storehouse');

        this.volumeForm.value.uniqueField = this.returnUniqField();
        console.log(this.volumeForm.value);
        const volumeForm = _.omitBy(this.volumeForm.value, _.isNil);
        this.volumesSrv.updateVolume(volumeForm).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Volume cadastrado com sucesso.');
                    this._route.navigate(['/volumes/get', this.volume._id]);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    goBack() {
        this._route.navigate(['/volumes/get', this.volume._id]);
    }

    search = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(storehouse =>
                storehouse.length < 2
                    ? []
                    : _.filter(this.storeHouses, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10)
            )
        )

    formatter = (x: { name: string }) => x.name;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                let res;
                if (company.length < 2) { []; } else { const res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
                this.getDepartament(this.volumeForm.value.company._id);
                return res;
            })
        )

    searchDepartament = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(departament =>
                departament.length < 2
                    ? []
                    : _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10)
            )
        )

    help() {
        this.introService.EditVolumes();
    }
}
