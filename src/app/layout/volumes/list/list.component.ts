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
  loading: Boolean = true;
  companies: any = [];
  company_id: string;
  statusList: any = [];
  departaments: any = [];
  storehouses: any = [];
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
    { name: 'Empresa', prop: 'company.name', width: 250 },
    { name: 'Departamento', prop: 'departament.name' },
    { name: 'Ármazem', prop: 'storehouse.name' },
    { name: 'Localização', prop: 'location', width: 70 },
    { name: 'Referência', prop: 'reference', width: 70 },
    /* { name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType } },
    { name: 'Status', prop: 'status', width: 50, pipe: { transform: this.pipes.status } },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } } */
  ];

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
  ) { }

  ngOnInit() {
    this.setPage({ offset: 0 })
    this.searchForm = this.fb.group({
      company: this.fb.control(null),
      departament: this.fb.control(null),
      status: this.fb.control(null),
      location: this.fb.control(""),
      storehouse: this.fb.control(null),
      reference: this.fb.control(null),
      endDate: this.fb.control(null),
      initDate: this.fb.control(null),
    });
    
    this.statusList = StatusVolumeEnum;
    this.getCompanies();
    this.getStoreHouses();
  }

  getVolume(volume) {
    this._route.navigate(['/volumes/get', volume._id]);
  }

  returnId(object) {
    this.searchForm.value[object] = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') return value;
    })[0];
  }

  getVolumes() {
    this.setPageVolumes({ offset: 0 })
  }

  formatter = (x: { name: string }) => x.name;

  setPageVolumes(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.returnId('company');
    this.returnId('storehouse');
    this.returnId('departament');
    var searchValue = _.omitBy(this.searchForm.value, _.isNil);
    this.volumeSrv.searchVolumes(searchValue, this.page).subscribe(
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
  }

  setPage(pageInfo) {
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
  }

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

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        var res = [];
        if (company.length < 2) [];
        else res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
        if (res.length > 0) {
          this.getDepartaments(res[0]._id);
        }
        return res;
      })
    );

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
          return
        };
        var res;
        if (departament.length < 2) [];
        else res = _.filter(this.departaments, v => v.name.toLowerCase().indexOf(departament.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

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
        var res;
        if (storehouse.length < 2) [];
        else res = _.filter(this.storehouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );
}
