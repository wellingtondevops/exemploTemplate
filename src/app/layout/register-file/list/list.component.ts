import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { VolumeList, Volume } from 'src/app/models/volume';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { RegistersService } from 'src/app/services/registers/registers.service';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import _ from 'lodash';
import { Doctype } from 'src/app/models/doctype';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';


interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
  type: 'warning',
  message: 'Insira um documento no volume para continuar.',
}];

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  alerts: Alert[];
  @ViewChild('myTable', ) table: any;
  tableRegister: Boolean = false;
  loading: Boolean = false;
  company_id: string;
  storeHouse_id: string;
  departaments: any = [];
  labels: any = [];
  companies: any = {
    _links: {
      self: '',
      totalPage: 0,
      currentPage: 1,
      foundItems: 0,
      next: ''
    },
    items: []
  };
  typeDocuments: Doctype[];
  registerFileForm: FormGroup;
  typeDocumentForm: FormGroup;
  storeHouses: any = [];
  inputBlock: Boolean = false;
  document: any;
  document_id: string;
  doctype_id: string;
  documents: any;
  volume: Volume;
  notDocument: boolean;
  location: string;
  registers: any = {
    _links: {
      self: '',
      totalPage: 0,
      currentPage: 1,
      foundItems: 0,
      next: ''
    },
    items: []
  };
  volumes: VolumeList = {
    _links: {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  tabIndex: Boolean = true;
  page = new Page();
  registerPage = new Page();
  @ViewChild('tab', ) private tab: NgbTabset;
  columns = [
    { name: 'Empresa', prop: 'company.name', width: 250 },
    { name: 'Departamento', prop: 'departament.name' },
    /*{ name: 'Ármazem', prop: 'storehouse.name' }, */
    { name: 'Posição', prop: 'location', width: 70 },
    /*{ name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType } },
    { name: 'Status', prop: 'status', width: 50, pipe: { transform: this.pipes.status } },
    { name: 'Referência', prop: 'reference', width: 70 },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }*/
  ];

  columnsRegisters = [
    { name: 'Dados Indexados', prop: 'index' },
    /*{ name: 'Doct', prop: 'doct._id' },
    { name: 'Label', prop: 'doct.label', width: 70 },
    { name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType } },
    { name: 'Status', prop: 'status', width: 50, pipe: { transform: this.pipes.status } },
    { name: 'Referência', prop: 'reference', width: 70 },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }*/
  ];

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private pipes: Pipes,
    private companiesSrv: CompaniesService,
    private storeHousesSrv: StorehousesService,
    private volumesSrv: VolumesService,
    private documentsSrv: DocumentsService,
    private registerSrv: RegistersService,
    private archivesSrv: ArquivesService,
    private warningMsgSrv: WarningMessagesService,
    private departamentsSrv: DepartamentsService,
    private utilCase: CaseInsensitive
  ) { }

  ngOnInit() {
    this.typeDocumentForm = this.fb.group({
      typeDocument: this.fb.control('', [Validators.required]),
      location: ''
    });
    this.registerFileForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      storehouse: this.fb.control('', [Validators.required]),
      location: this.fb.control(''),
      departament: this.fb.control('')
    });
    this.loading = true;
    this.getCompanies();
    this.getStoreHouses();
  }

  selectedCompany(e) {
    this.getTypeDocuments(e.item._id);
    this.getDepartaments(e.item._id);
  }

  get company() {
    return this.registerFileForm.get('company');
  }
  get storehouse() {
    return this.registerFileForm.get('storehouse');
  }
  get typeDocument() {
    return this.typeDocumentForm.get('typeDocument');
  }

  blockInputs() {
    !this.inputBlock ? (this.inputBlock = true) : (this.inputBlock = false);
  }

  formatter = (x: { name: string }) => x.name;

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

  getStoreHouses() {
    this.storeHousesSrv.searchStorehouses().subscribe(
      data => {
        this.loading = false;
        this.storeHouses = data.items;
      },
      error => {
        // this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  getTypeDocuments(company_id) {
    this.documentsSrv.searchDocuments(company_id).subscribe(data => {
      this.typeDocuments = data.items;
    });
  }

  getVolumesList() {
    this.loading = true;
    this.tableRegister = false;
    this.document = null;
    this.storeHouse_id = this.registerFileForm.value.storehouse._id;
    this.company_id = this.registerFileForm.value.company._id;
    const departament = this.registerFileForm.value.departament._id;
    const location = this.registerFileForm.value.location;
    /* var searchValue = _.omitBy(this.registerFileForm.value, _.isNil); */
    this.volumesSrv.listvolume(this.storeHouse_id, this.company_id, location, departament, this.page).subscribe(
      data => {
        this.volumes = data;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.tabIndex = false;
        this.reset();
        this.loading = false;
      }
    ), error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
      this.loading = false;
    };
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.getVolumesList();
  }

  selectTypeDocument(data) {
    this.loading = true;
    this.documentsSrv.document(data.item._id).subscribe(data => {
      this.document = data;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.errorMsg.errorMessages(error);
    });
  }

  getVolume(volume) {
    this.typeDocumentForm.reset({
      typeDocument: { value: '', required: true },
      location: {
        value: volume.location, disabled: true
      }
    });
    this.loading = true;
    this.getRegisterVolume(volume._id);
    this.volumesSrv.volume(volume._id).subscribe(data => {
      this.volume = data;
    }, error => {
      console.log(error);
    });
    this.tab.select('tab2');
  }

  getRegisterVolume(volume_id) {
    const page = {
      pageNumber: 0
    };
    this.registerSrv.listregister(volume_id, page).subscribe(data => {
      console.log(data.items);
      this.registers = this.newRegisters(data.items);
      if (this.registers.length !== 0) {
        this.getDoctype(this.registers[0].doct._id);
        this.getTypeDocuments(this.volume.company._id);
      } else {
        this.warningMsgSrv.showWarning('Insira um tipo de documento ao volume para continuar indexando.', true);
        this.notDocument = true;
        this.loading = false;
      }
      this.registerPage.pageNumber = data._links.currentPage - 1;
      this.registerPage.totalElements = data._links.foundItems;
      this.registerPage.size = data._links.totalPage;
      this.tableRegister = true;
      this.loading = false;
    }, error => {
      console.log('ERROR:', error);
      this.loading = false;
    });
  }

  newRegisters(registers) {
    registers.map(item => {
      item.index = this.mapLabel(item.doct.label, item.tag);
    });
    return registers;
  }

  mapLabel(labels, tags) {
    let obj = '';
    labels.map((item, i) => {
      if (i === (labels.length - 1)) {
        obj += `${item.namefield}: ${tags[i]}`;
      } else {
        obj += `${item.namefield}: ${tags[i]} | `;
      }
    });
    return obj;
  }

  getDoctype(doctype_id) {
    this.documentsSrv.document(doctype_id).subscribe(data => {
      this.document = data;
      this.typeDocumentForm.reset({
        typeDocument: { value: this.document, disabled: true },
        location: {
          value: this.volume.location, disabled: true
        }
      });
    }, error => {
      console.log('ERROR', error);
    });
  }

  setPageRegisters(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.registerSrv.listregister(this.volume._id, this.page).subscribe(data => {
      this.registers = this.newRegisters(data.items);
      // this.getDoctype(this.registers[0].doct._id);
      this.registerPage.pageNumber = data._links.currentPage - 1;
      this.registerPage.totalElements = data._links.foundItems;
      this.registerPage.size = data._links.totalPage;
      this.tableRegister = true;
      this.loading = false;
    }, error => {
      // this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }



  postArchive(data) {
    this.loading = true;
    const storehouse = this.storeHouse_id;
    const doct = this.document._id;
    const company = this.company_id;
    const tag = _.values(data);
    let uniqueness = '';
    const labelsTrueLength = _.filter(this.document.label, ['uniq', true]);
    this.document.label.map((label, i) => {
      if (label.uniq) {
        if (i === (labelsTrueLength.length - 1)) {
          uniqueness += `${tag[i]}`;
        } else {
          uniqueness += `${tag[i]}-`;
        }
      }
    });
    const volume = this.volume._id;
    console.log('arquive to index', { tag, company, doct, storehouse, uniqueness, volume });
    this.archivesSrv.newArchive({ tag, company, doct, storehouse, uniqueness, volume }).subscribe(data => {
      if (data._id) {
        console.log('success', data);
        this.getRegisterVolume(this.volume._id);
        this.loading = false;
        this.successMsgSrv.successMessages('Arquivo indexado com sucesso.');
      }
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

  // Alert
  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {
    this.alerts = Array.from(ALERTS);
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

  searchTypeDocument = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(typeDocument => {
        let res;
        if (typeDocument.length < 2) { []; } else { res = _.filter(this.typeDocuments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(typeDocument.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res = [];
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
        if (res.length > 0) {
          this.getDepartaments(res[0]._id);
        }
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
