import { Component, OnInit, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import _ from 'lodash';
import { StatusVolumeEnum } from 'src/app/models/status.volume.enum';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { NgbTypeahead, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { SaveLocal } from '../../../storage/saveLocal';
import { CaseInsensitive } from '../../../utils/case-insensitive';
import * as moment from 'moment';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  @ViewChild('instanceDepartament') instanceDepartament: NgbTypeahead;
  @ViewChild('instanceDocument',) instanceDocument: NgbTypeahead;
  @ViewChild('instanceStorehouse',) instanceStorehouse: NgbTypeahead;
  @ViewChild('searchTypeahead',)
  private readonly typeahead: NgbTypeahead;
  archives: Archive[];
  archivesCol: any[];
  page = new Page();
  loading = false;
  searchForm: FormGroup;
  companies: any = [];
  company_id: string;
  statusList: any = [];
  departaments: any = [];
  storehouses: any = [];
  documents: any = [];
  document: any;
  focusDepartament$ = new Subject<string>();
  clickDepartament$ = new Subject<string>();
  focusDocument$ = new Subject<string>();
  clickDocument$ = new Subject<string>();
  focusStorehouse$ = new Subject<string>();
  clickStorehouse$ = new Subject<string>();
  fileXls: string;
  archiveExport: string;
  nameArchiveExport: string;

  constructor(
    private archiveSrv: ArquivesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private fb: FormBuilder,
    private companiesSrv: CompaniesService,
    private departamentsSrv: DepartamentsService,
    private storehousesSrv: StorehousesService,
    private documentsSrv: DocumentsService,
    private warningMsg: WarningMessagesService,
    private localStorageSrv: SaveLocal,
    private utilCase: CaseInsensitive,
    config: NgbTypeaheadConfig
  ) {
    config.showHint = true;
    config.container = 'body';
    config.focusFirst = false;
  }

  ngOnInit() {
    // this.setPage({ offset: 0 });
    this.searchForm = this.fb.group({
      company: this.fb.control(null, Validators.required),
      departament: this.fb.control(null, [Validators.required]),
      status: this.fb.control('ATIVO'),
      location: this.fb.control('', Validators.required),
      storehouse: this.fb.control('', [Validators.required]),
      doct: this.fb.control(null, Validators.required),
      search: this.fb.control(null, Validators.required),
      endDate: this.fb.control(null),
      initDate: this.fb.control(null)
    });

    const archive = JSON.parse(this.localStorageSrv.get('archive'));

    if (archive && archive.company) {
      this.searchForm.patchValue({
        company: archive.company,
        departament: archive.departament,
        status: archive.status,
        location: archive.location,
        storehouse: archive.storehouse,
        doct: archive.doct,
        search: archive.search,
        endDate: archive.endDate,
        initDate: archive.initDate
      });
      this.selectedCompany(archive.company._id);
    }

    this.statusList = StatusVolumeEnum;
    this.getCompanies();
    this.getStoreHouses();
  }

  formatter = (x: { name: string }) => x.name;

  get company() {
    return this.searchForm.get('company');
  }
  get departament() {
    return this.searchForm.get('departament');
  }
  get doct() {
    return this.searchForm.get('doct');
  }
  get location() {
      return this.searchForm.get('location');
  }
  get storehouse() {
      return this.searchForm.get('storehouse');
  }

  returnId(object) {
    const result = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
    return result;
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.localStorageSrv.save('archive', this.searchForm.value);

    const newSearch = {
      company: null,
      storehouse: null,
      departament: null,
      doct: null,
      location: null,
      status: null,
      search: null,
      endDate: null,
      initDate: null,
    };

    this.searchForm.value.company ? newSearch.company = this.returnId('company') : null;
    this.searchForm.value.storehouse ? newSearch.storehouse = this.returnId('storehouse') : null;
    this.searchForm.value.departament ? newSearch.departament = this.returnId('departament') : null;
    this.searchForm.value.doct ? newSearch.doct = this.returnId('doct') : null;
    newSearch.location = this.searchForm.value.location;
    newSearch.status = this.searchForm.value.status;
    newSearch.search = this.searchForm.value.search;
    newSearch.endDate = this.searchForm.value.endDate;
    newSearch.initDate = this.searchForm.value.initDate;

    const searchValue = _.omitBy(newSearch, _.isNil);

    this.archiveSrv.archives(searchValue, this.page, null).subscribe(data => {
      this.page.pageNumber = data._links.currentPage - 1;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      const resultWithIndex = this.newRegisters(data.items);
      this.archives = resultWithIndex;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log('ERROR: ', error);
      this.errorMsg.errorMessages(error);
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }

  showView(value) {
    if (value.type === 'click') {
      this._route.navigate(['/archives/get', value.row._id]);
    }
    /* if (value.type === 'click') {
      this._route.navigate(['/archives/get', value.row._id]);
    } else if (value.type === 'mouseenter') {
      this.toggleExpandRow(value.row)
    } */
  }

  guardType(value) {
    let res = '';
    switch (value) {
      case 'GERENCIADA':
        res = 'G';
        break;
    }
    return res;
  }

  getArchive() {
    if (this.searchForm.value.company) {
      this.setPage({ offset: 0 });
    }
  }

  clear() {
    this.localStorageSrv.clear('archive');
    this.searchForm.patchValue({
      company: null,
      departament: null,
      status: 'ATIVO',
      location: null,
      storehouse: null,
      doct: null,
      search: null,
      endDate: null,
      initDate: null
    });
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

  selectedCompany(e) {
    if (e && e.item && e.item._id) {
      this.getDocuments(e.item._id);
      this.getDepartaments(e.item._id);
    } else {
      this.getDocuments(e);
      this.getDepartaments(e);
    }
  }

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res = [];
        if (company.length < 2) { []; } else {
          res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
        }
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

  searchDepartament = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickDepartament$.pipe(filter(() => !this.instanceDepartament.isPopupOpen()));
    const inputFocus$ = this.focusDepartament$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(departament => (departament === '' ? this.departaments
        : _.filter(this.departaments, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(departament.toLowerCase())) > -1).slice(0, 10)
      )));
  }

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

  searchStorehouse = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickStorehouse$.pipe(filter(() => !this.instanceStorehouse.isPopupOpen()));
    const inputFocus$ = this.focusStorehouse$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(storehouse => (storehouse === '' ? this.storehouses
        : _.filter(this.storehouses, v => this.utilCase.replaceSpecialChars(v.name.toLowerCase().indexOf(storehouse.toLowerCase())) > -1).slice(0, 10)
      )));
  }

  /* searchStorehouse = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(storehouse => {
        var res;
        if (storehouse.length < 2) [];
        else res = _.filter(this.storehouses, v => v.name.toLowerCase().indexOf(storehouse.toLowerCase()) > -1).slice(0, 10);
        return res;
      })
    ); */

  getDocuments(company_id) {
    this.documentsSrv.searchDocuments(company_id).subscribe(
      data => {
        this.documents = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  searchDocument = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickDocument$.pipe(filter(() => !this.instanceDocument.isPopupOpen()));
    const inputFocus$ = this.focusDocument$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(document => (document === '' ? this.documents
        : _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10)
      )));
  }

  /*   searchDocument = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        map(document => {
          var res;
          if (document.length < 2) [];
          else res = _.filter(this.documents, v => v.name.toLowerCase().indexOf(document.toLowerCase()) > -1).slice(0, 10);
          return res;
        })
      ); */

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
            obj += `<u><b>${item.namefield}:&nbsp</b></u> ${tags[i] || ''}</br>`;
      } else {
        obj += `<u><b>${item.namefield}:&nbsp</b></u>${tags[i]}</br>`;
      }
    });
    return obj;
  }

  exportArchives() {
    this.loading = true;
    this.localStorageSrv.save('archive', this.searchForm.value);

    const newSearch = {
      company: null,
      storehouse: null,
      departament: null,
      doct: null,
      location: null,
      status: null,
      search: null,
      endDate: null,
      initDate: null,
    };

    this.searchForm.value.company ? newSearch.company = this.returnId('company') : null;
    this.searchForm.value.storehouse ? newSearch.storehouse = this.returnId('storehouse') : null;
    this.searchForm.value.departament ? newSearch.departament = this.returnId('departament') : null;
    this.searchForm.value.doct ? newSearch.doct = this.returnId('doct') : null;
    newSearch.location = this.searchForm.value.location;
    newSearch.status = this.searchForm.value.status;
    newSearch.search = this.searchForm.value.search;
    newSearch.endDate = this.searchForm.value.endDate;
    newSearch.initDate = this.searchForm.value.initDate;

    const searchValue = _.omitBy(newSearch, _.isNil);
    console.log(searchValue);
    this.archiveSrv.export(searchValue).subscribe(data => {
      this.loading = false;
      this.showPdf(data.file, data.name);
    }, error => {
      this.loading = false;
      console.log('ERROR: ', error);
    });
  }

  showPdf(base64, name) {
    const linkSource = 'data:application/pdf;base64, ' + base64;
    const downloadLink = document.createElement('a');
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  typeaheadKeydown() {
    if (!this.typeahead.isPopupOpen()) {
      return;
    }

    setTimeout(() => {
      const popup = document.getElementById(this.typeahead.popupId),
        activeElements = popup.getElementsByClassName('active');
      if (activeElements.length === 1) {
        const elem = <HTMLElement>activeElements[0];
        elem.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    });
  }
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
