import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MovimentList } from 'src/app/models/moviment';
import { Page } from 'src/app/models/page';
import { MovimentsService } from 'src/app/services/moviments/moviments.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import _ from 'lodash';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { WarningMessagesService } from 'src/app/utils/warning-messages/warning-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Pipes } from 'src/app/utils/pipes/pipes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  searchForm: FormGroup;
  moviments: MovimentList = {
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
  loading: Boolean = false;
  companies: any = [];
  permissionNew = false;

  columns = [
    {name: 'Nr. Movimentação', prop: 'nr', width: 70},
    { name: 'Empresa', prop: 'company.name', width: 250 },
    { name: 'Nome', prop: 'requester.name' },
    { name: 'Status da Operação', prop: 'title' },
    { name: 'Data da Solicitação', prop: 'demandDate', width: 70, pipe: { transform: this.pipes.datePipe } },
    { name: 'Data da Movimentação', prop: 'processedDate', width: 70, pipe: { transform: this.pipes.datePipe } },
  ];

  constructor(
    private fb: FormBuilder,
    private _route: Router,
    private pipes: Pipes,
    private movimentsSrv: MovimentsService,
    private errorMsg: ErrorMessagesService,
    private successMsgSrv: SuccessMessagesService,
    private companiesSrv: CompaniesService,
    private departamentsSrv: DepartamentsService,
    private storehousesSrv: StorehousesService,
    private documentsSrv: DocumentsService,
    private warningMsg: WarningMessagesService,
    private localStorageSrv: SaveLocal,
    private utilCase: CaseInsensitive
  ) {
    this.searchForm = this.fb.group({
      company: this.fb.control('', Validators.required),
      name: this.fb.control(null, Validators.required),
      demand: this.fb.control(false),
      processed: this.fb.control(false),
      initDate: this.fb.control(null),
      endDate: this.fb.control(null),
      nr: this.fb.control(null)
    });
   }

  ngOnInit() {
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
    this.getCompanies();
  }

  get company() {
    return this.searchForm.get('company');
  }

  showMoviment(moviment) {
    this._route.navigate(['/moviments/get', moviment._id]);
  }

  getMoviments() {
    this.setPageMoviments({ offset: 0 });
  }

  formatter = (x: { name: string }) => x.name;

  returnId(object) {
    const result = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
    return result;
  }

  clear() {
    this.localStorageSrv.clear('moviment');
    console.log('clear');
    this.searchForm.patchValue({
      company: null,
      name: null,
      demand: null,
      processed: null,
      initDate: null,
      endDate: null,
      nr: null
    });
  }


  setPageMoviments(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    const newSearch = {
      company: null,
      name: null,
      demand: null,
      processed: null,
      initDate: null,
      endDate: null,
      nr: null
    };
    this.localStorageSrv.save('moviment', this.searchForm.value);
    this.searchForm.value.company ? newSearch.company = this.returnId('company') : null;
    this.searchForm.value.name ? newSearch.name = this.searchForm.value.name : null;
    this.searchForm.value.demand ? newSearch.demand = this.searchForm.value.demand : null;
    this.searchForm.value.processed ? newSearch.processed = this.searchForm.value.processed : null;
    this.searchForm.value.initDate ? newSearch.initDate = this.searchForm.value.initDate : null;
    this.searchForm.value.endDate ? newSearch.endDate = this.searchForm.value.endDate : null;
    this.searchForm.value.nr ? newSearch.nr = this.searchForm.value.nr : null;

    const searchValue = _.omitBy(newSearch, _.isNil);

    this.movimentsSrv.searchMoviments(searchValue, this.page).subscribe(
      data => {
        this.moviments = data;
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
        let res = [];
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

}
