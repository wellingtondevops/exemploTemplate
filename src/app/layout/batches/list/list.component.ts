import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesList } from 'src/app/models/company';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { routerTransition } from '../../../router.animations';
import _ from 'lodash';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})

export class ListComponent implements OnInit {
  searchForm: FormGroup;
  companies: any = [];
  loading: Boolean = true;
  permissionNew: boolean = false;
  documents: any = [];
  batches: any = [];
  page = new Page();

  columns = [
    { name: 'Nome', prop: 'name' },
    /*{ name: 'CPF/CNPJ', prop: 'cpfCnpj' },*/
    { name: 'E-mail', prop: 'email' },
    { name: 'Telefone', prop: 'fone' },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
  ];

  constructor(
    private _route: Router,
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes,
    private fb: FormBuilder,
    private documentsSrv: DocumentsService,
    private utilCase: CaseInsensitive,
    private localStorageSrv: SaveLocal,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      company: this.fb.control('', [Validators.required]),
      doct: this.fb.control(''),
      batchNr: this.fb.control(''),
      initDate: this.fb.control(''),
      endDate: this.fb.control('')
    });
    this.getCompanies();

    const batch = JSON.parse(this.localStorageSrv.get('batch'));
    if (batch && batch.company) {
      this.searchForm.patchValue({
        company: batch.company,
        doct: batch.doct,
        endDate: batch.endDate,
        initDate: batch.initDate,
      });
      this.getDocuments(batch.company._id);
    }
  }

  formatter = (x: { name: string }) => x.name;

  getBatches() {

  }

  get company() {
    return this.searchForm.get('company');
  }

  selectedCompany(e) {
    this.getDocuments(e.item._id);
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.companiesSrv.searchCompany(this.searchForm.value, this.page).subscribe(data => {
      this.page.pageNumber = data._links.currentPage - 1;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.companies = data;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  getDocuments(company_id) {
    this.loading = true;
    this.documentsSrv.searchDocuments(company_id).subscribe(
      data => {
        this.documents = data.items;
        this.loading = false;
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
        if (res.length > 0) {
          this.getDocuments(res[0]._id);
        }
        return res;
      })
    )

  searchDocument = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(document =>
        document.length < 2
          ? []
          : _.filter(this.documents, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(document.toLowerCase())) > -1).slice(0, 10)
      )
    )

  clear() {
    this.localStorageSrv.clear('volume');

    this.searchForm.patchValue({
      company: null,
      departament: null,
      batchNr: null,
      endDate: null,
      initDate: null
    });
  }
}
