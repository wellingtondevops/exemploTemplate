import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import _ from 'lodash'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {
  searchForm: FormGroup;
  companies: any = [];
  loading: Boolean = true;

  constructor(
    private _route: Router,
    private documentSrv: DocumentsService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private pipes: Pipes,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal
  ) { }

  ngOnInit() {
    this.getCompanies();

    this.searchForm = this.fb.group({
      company: this.fb.control(null, [Validators.required]),
      initDate: this.fb.control(null, [Validators.required]),
      endDate: this.fb.control(null, [Validators.required])
    });
  }

  get company() {
    return this.searchForm.get('company');
  }

  get initDate() {
    return this.searchForm.get('initDate');
  }

  get endDate() {
    return this.searchForm.get('endDate');
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

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        const res = [];
        if (company.length < 2) { []; }
        return _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
      })
    )

  getReports() {
    (this.searchForm.value)
  }
}
