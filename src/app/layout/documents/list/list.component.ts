import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { DocumentList } from 'src/app/models/document';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { SaveLocal } from '../../../storage/saveLocal';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  searchForm: FormGroup;
  companies: any = [];
  documents: DocumentList = {
    _links: {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  page = new Page();
  columns = [

    { name: 'Nome', prop: 'name' },
    { name: 'Fase Corrente', prop: 'dcurrentValue'},
    { name: 'Fase Intermédiaria', prop: 'dintermediateValue'},
    { name: 'Destinação Final', prop: 'dfinal'},



  ];
  loading: Boolean = false;
  permissionNew = false;

  constructor(
    private _route: Router,
    private documentSrv: DocumentsService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private pipes: Pipes,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal,
    private utilCase: CaseInsensitive
  ) { }

  ngOnInit() {
    this.getCompanies();

    this.searchForm = this.fb.group({
      name: this.fb.control(null),
      company: this.fb.control(null, [Validators.required]),
    });
    const document = JSON.parse(this.localStorageSrv.get('document'));
    if (document && document.company) {
      this.searchForm.patchValue({
        company: document.company,
        name: document.name
      });
    }

    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
  }

  get company() {
    return this.searchForm.get('company');
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

  getDocuments() {
    this.setPageDocuments({ offset: 0 });
  }

  returnId(object) {
    this.searchForm.value[object] = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
  }

  setPageDocuments(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.localStorageSrv.save('document', this.searchForm.value);

    const newForm = {
      company: this.searchForm.value.company._id,
      name: this.searchForm.value.name ? this.searchForm.value.name : null,
    };

    this.documentSrv.searchDocts(newForm, this.page).subscribe(data => {
      this.page.pageNumber = data._links.currentPage;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.documents = data;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  getDocument(document) {
    this._route.navigate(['/documents/get', document._id]);
  }

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        const res = [];
        if (company.length < 2) { []; }
        return _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);

      })
    )

  clear() {
    this.localStorageSrv.clear('document');

    this.searchForm.patchValue({
      company: null,
      name: null
    });
  }
}
