import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { DocumentList } from 'src/app/models/document';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';

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
    { name: 'Empresa', prop: 'company.name' },
    { name: 'Nome', prop: 'name' },
    { name: 'Retenção', prop: 'retention' },
    /* { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } } */
  ];
  loading: Boolean = true;

  constructor(
    private _route: Router,
    private documentSrv: DocumentsService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private pipes: Pipes,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.getCompanies();
    this.setPage({ offset: 0 });
    // this.documentsList();
    this.searchForm = this.fb.group({
      name: this.fb.control(null),
      company: this.fb.control(null),
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

  /* documentsList() {
      this.documentSrv.documents(null).subscribe(
          data => {
              this.loading = false;
              this.documents = data;
              this.page.pageNumber = data._links.currentPage;
              this.page.totalElements = data._links.foundItems;
              this.page.size = data._links.totalPage;
          },
          error => {
              this.loading = false;
              this.errorMsg.errorMessages(error);
              console.log('ERROR: ', error);
          }
      );
  } */

  getDocuments() {
    this.setPageDocuments({ offset: 0 })
  }

  returnId(object) {
    this.searchForm.value[object] = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') return value;
    })[0];
  }

  setPageDocuments(pageInfo) {
    this.loading = true
    this.page.pageNumber = pageInfo.offset;
    this.returnId('company');

    this.documentSrv.searchDocts(this.searchForm.value, this.page).subscribe(data => {
      this.page.pageNumber = data._links.currentPage - 1;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.documents = data;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error)
      this.loading = false;
    });
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.documentSrv.documents(this.page).subscribe(
      data => {
        this.loading = false;
        this.documents = data;
        this.page.pageNumber = data._links.currentPage - 1;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.loading = false;
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
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
        var res = [];
        if (company.length < 2) [];
        return _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);

      })
    );
}
