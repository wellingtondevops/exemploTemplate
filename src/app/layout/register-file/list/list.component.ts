import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { VolumeList, Volume } from 'src/app/models/volume';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { DoctypesService } from 'src/app/services/doctypes/doctypes.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { RegistersService } from 'src/app/services/registers/registers.service';
import { RegistersList } from 'src/app/models/register';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import _ from 'lodash';
import { DoctypeList, Doctype } from 'src/app/models/doctype';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  tableRegister: Boolean = false;
  loading: Boolean = false;
  company_id: string;
  storeHouse_id: string;
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
  }
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
  @ViewChild('tab') private tab: NgbTabset;
  columns = [
    { name: 'Empresa', prop: 'company.name', width: 250 },
    { name: 'Descrição', prop: 'description' },
    /*{ name: 'Ármazem', prop: 'storehouse.name' },*/
    { name: 'Localização', prop: 'location', width: 70 },
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
  ]

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private pipes: Pipes,
    private doctsSrv: DoctypesService,
    private companiesSrv: CompaniesService,
    private storeHousesSrv: StorehousesService,
    private volumesSrv: VolumesService,
    private documentsSrv: DocumentsService,
    private registerSrv: RegistersService,
    private doctypesSrv: DoctypesService,
    private archivesSrv: ArquivesService
  ) { }

  ngOnInit() {
    this.typeDocumentForm = this.fb.group({
      typeDocument: this.fb.control('', [Validators.required])
    })
    this.registerFileForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      storehouse: this.fb.control('', [Validators.required]),
      location: this.fb.control(''),
      description: this.fb.control('')
    });
    this.loading = true;
    this.getCompanies();
    this.getTypeDocuments()
    this.getStoreHouses();
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

  getTypeDocuments() {
    this.doctypesSrv.listdocts().subscribe(data => {
      this.typeDocuments = data.items;
    })
  }

  getVolumesList() {
    this.loading = true;
    this.tableRegister = false;
    this.document = null;
    this.storeHouse_id = this.registerFileForm.value.storehouse._id;
    this.company_id = this.registerFileForm.value.company._id;
    var description = this.registerFileForm.value.description;
    var location = this.registerFileForm.value.location;
    this.volumesSrv.listvolume(this.storeHouse_id, this.company_id, location, description).subscribe(
      data => {
        this.volumes = data;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.tabIndex = false;
        this.loading = false;
      }
    ), error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
      this.loading = false;
    }
  }

  selectTypeDocument(data) {
    this.loading = true;
    this.documentsSrv.document(data.item._id).subscribe(data => {
      this.document = data;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.errorMsg.errorMessages(error);
    })
  }

  /*   getDocument() {
      var document_id = this.typeDocumentForm.value.typeDocument._id
      this.documentsSrv.document(document_id).subscribe(data => {
        this.document = data
      }, error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      })
    } */

  getVolume(volume) {
    console.log(volume)
    this.loading = true;
    this.getRegisterVolume(volume._id)
    this.volumesSrv.volume(volume._id).subscribe(data => {
      this.volume = data
    }, error => {
      console.log(error)
    })
    this.tab.select('tab2');
  }

  getRegisterVolume(volume_id) {
    var page = {
      pageNumber: 0
    }
    this.registerSrv.listregister(volume_id, page).subscribe(data => {
      this.registers = this.newRegisters(data.items);
      if (this.registers.length !== 0) {
        this.getDoctype(this.registers[0].doct._id);
      } else {
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
    })
  }

  newRegisters(registers) {
    registers.map(item => {
      item.index = this.mapLabel(item.doct.label, item.tag);
    })
    return registers
  }

  mapLabel(labels, tags) {
    var obj = ''
    labels.map((item, i) => {
      if (i === (labels.length - 1)) {
        obj += `${item.namefield}: ${tags[i]}`
      } else {
        obj += `${item.namefield}: ${tags[i]} | `
      }
    })
    return obj
  }

  getDoctype(doctype_id) {
    this.doctypesSrv.doctype(doctype_id).subscribe(data => {
      this.document = data;
      this.typeDocumentForm.value.typeDocument = this.document.name;
    }, error => {
      console.log('ERROR', error)
    })
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
    let labelsTrueLength = _.filter(this.document.label, ['uniq', true])
    this.document.label.map((label, i) => {
      if (label.uniq) {
        if (i === (labelsTrueLength.length - 1)) {
          uniqueness += `${tag[i]}`
        } else {
          uniqueness += `${tag[i]}-`
        }
      }
    })
    var volume = this.volume._id;
    console.log('arquive to index', { tag, company, doct, storehouse, uniqueness, volume });
    this.archivesSrv.newArchive({ tag, company, doct, storehouse, uniqueness, volume }).subscribe(data => {
      if (data._id) {
        console.log('success', data)
        this.getRegisterVolume(this.volume._id)
        this.loading = false;
        this.successMsgSrv.successMessages('Arquivo indexado com sucesso.');
      }
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    })
  }

  sendDocument() {

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

  searchTypeDocument = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(typeDocument => {
        var res;
        if (typeDocument.length < 2) [];
        else var res = _.filter(this.typeDocuments, v => v.name.toLowerCase().indexOf(typeDocument.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    );

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        var res;
        if (company.length < 2) [];
        else var res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
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