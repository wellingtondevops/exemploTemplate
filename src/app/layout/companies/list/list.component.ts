import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies/companies.service';
import { CompaniesList, Company } from 'src/app/models/company';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  companies: Company[];

  constructor(
    private companiesSrv: CompaniesService
  ) { }

  ngOnInit() {
    this.companiesList();
  }

  companiesList() {
    this.companiesSrv.companies().subscribe(
      (data) => {
        console.log('Companies', data);
        this.companies = data.items;
      },
      (error) => {
        console.log('ERROR:', error);
      }
    )
  }

}
