import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies/companies.service';
import { routerTransition } from '../../../router.animations';
import { Company, CompaniesList } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from '../../../utils/pipes/pipes';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  companies: CompaniesList;
  page: Pagination;
  columns = [
    {name: 'Nome', prop: 'name'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.companiesList();
  }

  companiesList() {
    this.companiesSrv.companies(null).subscribe(
      (data) => {
        this.companies = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;
    this.companiesSrv.companies(this.page).subscribe(data => {
      this.page = data._links;
      this.companies = data;
    });
  }
}
