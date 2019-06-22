import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies/companies.service';
import { routerTransition } from '../../../router.animations';
import { Company } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  companies: Company[];

  constructor(
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {
    this.companiesList();
  }

  companiesList() {
    this.companiesSrv.companies().subscribe(
      (data) => {
        this.companies = data.items;
      },
      (error) => {
        this.errorMsg.errorMessages(error)
        console.log('ERROR:', error);
      }
    )
  }

}
