import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Report } from 'src/app/models/report'
import { SaveLocal } from 'src/app/storage/saveLocal';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import _ from 'lodash'
import * as moment from 'moment'
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  animations: [routerTransition()]
})
export class ReportsComponent implements OnInit {
  searchForm: FormGroup;
  companies: any = [];
  loading: Boolean = false;
  reports: Report;

  constructor(
    private _route: Router,
    private reportSrv: ReportsService,
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

  returnId(object) {
    const result = _.filter(this.searchForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
    return result;
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
    this.searchForm.value.company = this.returnId('company') ? this.returnId('company') : null;
    this.loading = true;
    this.reportSrv.reports(this.searchForm.value).subscribe(data => {
      this.reports = data
      this.reports.initialPeriod = moment(this.reports.initialPeriod).format('DD/MM/YYYY')
      this.reports.finalPeriod = moment(this.reports.finalPeriod).format('DD/MM/YYYY')
      this.loading = false
    }, error => {
      console.log('ERROR: ', error);
      this.errorMsg.errorMessages(error);
      this.loading = false
    })
  }
}
