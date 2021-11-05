import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { Volume, VolumeList } from 'src/app/models/volume';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Page } from 'src/app/models/page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import _ from 'lodash';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { GuardyTypeVolumeEnum } from 'src/app/models/guardtype.volume.enum';
import { SaveLocal } from '../../../storage/saveLocal';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';


const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  searchForm: FormGroup;
  height: any;
  loading: Boolean = false;
  companies: any = [];
  company_id: string;
  statusList: any = [];
  departaments: any = [];
  guardTypeList: any = [];
  storehouses: any = [];
  records: boolean;

  documents: any = [];
  volumes: VolumeList = {
    _links: {
      currentPage: 0,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  page = new Page();

  columns = [
    // { name: 'Empresa', prop: 'company.name', width: 250 },
    { name: 'Departamento', prop: 'departament.name' },
    { name: 'Posição', prop: 'location', width: 70 },
    { name: 'Status', prop: 'status', width: 70 },
    { name: 'Guarda', prop: 'guardType', width: 70,  },
    { name: 'Depósito', prop: 'storehouse.name', width: 70 },
    { name: 'Referência', prop: 'reference', width: 70 },
    { name: 'Conteúdo', prop: 'records', width: 90, pipe: {transform: this.pipes.recordsType }},
    { name: 'Criado em', prop: 'dateCreated', width: 70, pipe: { transform: this.pipes.datePipe } }

    /* { name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType } },
    { name: 'Status', prop: 'status', width: 50, pipe: { transform: this.pipes.status } },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } } */
  ];
  permissionNew = false;
  isUsers = false;

  constructor(
    private el: ElementRef,
    private volumeSrv: VolumesService,
    private _route: Router,
    private pipes: Pipes,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private successMsgSrv: SuccessMessagesService,
    private fb: FormBuilder,
    private companiesSrv: CompaniesService,
    private departamentsSrv: DepartamentsService,
    private storehousesSrv: StorehousesService,
    private documentsSrv: DocumentsService,
    private warningMsg: WarningMessagesService,
    private localStorageSrv: SaveLocal,
    private utilCase: CaseInsensitive
  ) {
    this.guardTypeList = GuardyTypeVolumeEnum;
  }

  ngOnInit() {
    // this.setPage({ offset: 0 })
    this.searchForm = this.fb.group({
      company: this.fb.control(null, Validators.required),
      departament: this.fb.control(null),
      status: this.fb.control('ATIVO'),
      location: this.fb.control(''),
      storehouse: this.fb.control(null),
      reference: this.fb.control(null),
      endDate: this.fb.control(null),
      initDate: this.fb.control(null),
      guardType: this.fb.control('GERENCIADA'),
      records: this.fb.control(null),
    });
    const volume = JSON.parse(this.localStorageSrv.get('volume'));
    if (volume && volume.company) {
      this.searchForm.patchValue({
        company: volume.company,
        departament: volume.departament,
        status: volume.status,
        location: volume.location,
        storehouse: volume.storehouse,
        reference: volume.reference,
        endDate: volume.endDate,
        initDate: volume.initDate,
        guardType: volume.guardType,
        records: volume.records
      });

      this.getDepartaments(volume.company._id);
    }

    this.statusList = StatusVolumeEnum;
    this.getVolumes();
    this.getCompanies();
    this.getStoreHouses();
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
    this.isUsers = JSON.parse(localStorage.getItem('userExternal'));
  }

  get company() {
    return this.searchForm.get('company');
  }

  getVolume(volume) {
    this._route.navigate(['/volumes/get', volume._id]);
  }

  returnId(object) {
    const result = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
    return result;
  }

  clear() {
    this.localStorageSrv.clear('volume');

    this.searchForm.patchValue({
      company: null,
      departament: null,
      status: 'ATIVO',
      location: null,
      storehouse: null,
      reference: null,
      endDate: null,
      initDate: null,
      guardType: 'GERENCIADA',
      records: null
    });
  }

  getVolumes() {
    this.setPageVolumes({ offset: 0 });
  }

  formatter = (x: { name: string }) => x.name;

  setPageVolumes(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    console.log(this.page);
    this.localStorageSrv.save('volume', this.searchForm.value);


    const newForm = {
      company: null,
      storehouse: null,
      departament: null,
      status: null,
      location: null,
      reference: null,
      endDate: null,
      initDate: null,
      guardType: null,
      records: null
    };

    this.searchForm.value.company ? newForm.company = this.returnId('company') : null;
    this.searchForm.value.storehouse ? newForm.storehouse = this.returnId('storehouse') : null;
    this.searchForm.value.departament ? newForm.departament = this.returnId('departament') : null;
    this.searchForm.value.status ? newForm.status = this.searchForm.value.status : null;
    this.searchForm.value.location ? newForm.location = this.searchForm.value.location : null;
    this.searchForm.value.reference ? newForm.reference = this.searchForm.value.reference : null;
    this.searchForm.value.endDate ? newForm.endDate = this.searchForm.value.endDate : null;
    this.searchForm.value.initDate ? newForm.initDate = this.searchForm.value.initDate : null;
    this.searchForm.value.guardType ? newForm.guardType = this.searchForm.value.guardType : null;
    this.searchForm.value.records ? newForm.records = this.searchForm.value.records : null;

    const searchValue = _.omitBy(newForm, _.isNil);

    this.volumeSrv.searchVolumes(searchValue, this.page).subscribe(
      data => {
        this.volumes = data;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  /* setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.volumeSrv.volumes(this.page).subscribe(
      data => {
        this.volumes = data;
        this.page.pageNumber = data._links.currentPage - 1;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  } */

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  selectedCompany(e) {
    if (e && e.item && e.item._id) {
      this.getDepartaments(e.item._id);
    } else {
      this.getDepartaments(e);
    }
  }

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res = [];
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  getDepartaments(company_id) {
    this.departamentsSrv.searchDepartaments(company_id).subscribe(
      data => {
        this.departaments = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  searchDepartament = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(departament => {
        if (this.searchForm.value.company === '' || this.searchForm.value.company._id === 'undefined') {
          this.warningMsg.showWarning('Selecione uma empresa.', 4000);
          return;
        }
        let res;
        if (departament.length < 2) { []; } else { res = _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  getStoreHouses() {
    this.storehousesSrv.searchStorehouses().subscribe(
      data => {
        this.storehouses = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  searchStorehouse = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(storehouse => {
        let res;
        if (storehouse.length < 2) { []; } else { res = _.filter(this.storehouses, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )
}
