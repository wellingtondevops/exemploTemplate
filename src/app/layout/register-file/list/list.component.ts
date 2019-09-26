import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Router } from '@angular/router';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { VolumeList } from 'src/app/models/volume';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { DoctypesService } from 'src/app/services/doctypes/doctypes.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { RegistersService } from 'src/app/services/registers/registers.service';
import { RegistersList } from 'src/app/models/register';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  tableRegister: Boolean = false;
  companies: any = [];
  registerFileForm: FormGroup;
  typeDocumentForm: FormGroup;
  storeHouses: any = [];
  inputBlock: Boolean = false;
  document: any;
  documents: any;
  registers: any = {
    _links: {
      self: '',
      totalPage: 0,
      currentPage: 0,
      foundItems: 0,
      next: ''
    },
    items: []
  }
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
    { name: 'Id', prop: '_id' },
    /*{ name: 'Doct', prop: 'doct._id' },
    { name: 'Label', prop: 'doct.label', width: 70 }*/,
    /*{ name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType } },
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
    private registerSrv: RegistersService
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

    this.getCompanies();
    this.getStoreHouses();
    this.getListDocts();
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
      }
    );
  }

  getListDocts() {
    this.doctsSrv.listdocts().subscribe(data => {
      console.log(data)
      this.documents = data.items;
    }, error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    })
  }

  getStoreHouses() {
    this.storeHousesSrv.searchStorehouses().subscribe(
      data => {
        // this.loading = false;
        this.storeHouses = data.items;
      },
      error => {
        // this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  getVolumesList() {
    var storehouse_id = this.registerFileForm.value.storehouse._id;
    var company_id = this.registerFileForm.value.company._id;
    var description = this.registerFileForm.value.description;
    var location = this.registerFileForm.value.location;
    this.tableRegister = false;
    this.volumesSrv.listvolume(storehouse_id, company_id, location, description).subscribe(
      data => {
        console.log(data)
        this.volumes = data;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.tabIndex = false;
      }
    ), error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    }
  }

  getDocument() {
    var document_id = this.typeDocumentForm.value.typeDocument._id
    this.documentsSrv.document(document_id).subscribe(data => {
      console.log('document', data)
      this.document = data
    }, error => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    })
  }

  getVolume(volume) {
    this.getRegisterVolume(volume)
    this.tab.select('tab2');
  }

  getRegisterVolume(volume_id) {
    console.log('volume_id', volume_id)
    this.registerSrv.listregister(volume_id).subscribe(data => {
      this.registers = data.items;
      console.log('registers', this.registers)
      this.registerPage.pageNumber = data._links.currentPage;
      this.registerPage.totalElements = data._links.foundItems;
      this.registerPage.size = data._links.totalPage;
      this.tableRegister = true;
      console.log('registers', this.registers);
      console.log('tableRegister', this.tableRegister);
    }, error => {
      console.log('error', error)
    })
  }

  getRegister() {
    this.getDocument()
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }

  searchDocts = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(typeDocument =>
        typeDocument.length < 2
          ? []
          : _.filter(this.documents, v => v.name.toLowerCase().indexOf(typeDocument.toLowerCase()) > -1).slice(0, 10)
      )
    );

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