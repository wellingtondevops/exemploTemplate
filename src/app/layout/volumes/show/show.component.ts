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
import { ActivatedRoute, Router } from '@angular/router';
import { Volume } from 'src/app/models/volume';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import * as moment from 'moment';
import { VolumeTypeEnum } from 'src/app/models/volume.type.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
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
    changeUp = false;
    hiddenReference: Boolean = true;

    constructor(
        private route: ActivatedRoute,
        private storeHousesSrv: StorehousesService,
        private departamentsSrv: DepartamentsService,
        private volumesSrv: VolumesService,
        private companiesSrv: CompaniesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private fb: FormBuilder,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private _route: Router
    ) {
        this.statusList = StatusVolumeEnum;
        this.volumeTypeList = VolumeTypeEnum;
        this.guardTypeList = GuardyTypeVolumeEnum;

        this.volumeForm = this.fb.group({
            _id: this.fb.control(''),
            storehouse: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            description: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            guardType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            volumeType: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            departament: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            uniqueField: this.fb.control(''),
            location: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            reference: this.fb.control({ value: '', disabled: true })
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
    get companyIpt() {
        return this.volumeForm.get('company');
    }
    get storehouse() {
        return this.volumeForm.get('storehouse');
    }
    get reference() {
        return this.volumeForm.get('reference');
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
                    status: data.status,
                    reference: data.reference
                });
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR', error);
            }
        );
    }

    changeUpdate() {
        !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
        if (this.changeUp) {
            this.volumeForm.reset({
                _id: this.volume._id,
                description: { value: this.volume.description, disabled: false },
                location: { value: this.volume.location, disabled: false },
                company: { value: this.volume.company, disabled: false },
                departament: { value: this.volume.departament, disabled: false },
                storehouse: { value: this.volume.storehouse, disabled: false },
                status: { value: this.volume.status, disabled: false },
                guardType: { value: this.volume.guardType, disabled: false },
                volumeType: { value: this.volume.volumeType, disabled: false },
                reference: { value: this.volume.reference, disabled: false },
                dateCreated: { value: moment(this.volume.dateCreated).format('YYYY-MM-DD'), disabled: true }
            });
        }
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

    editVolume(volume) {
        this._route.navigate(['/volumes/edit', volume]);
    }

    delete(volume) {
        this.volumesSrv.deleteVolume(volume).subscribe(
            response => {
                this.successMsgSrv.successMessages('Volume deletado com sucesso.');
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }

    open(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Volume foi deletado com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Volume?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao volume serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }

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
