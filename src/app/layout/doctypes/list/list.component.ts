import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DoctypesService } from 'src/app/services/doctypes/doctypes.service';
import { DoctypeList } from 'src/app/models/doctype';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from 'src/app/utils/pipes/pipes';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  doctypes: DoctypeList;
  page: Pagination;
  columns = [
    {name: 'Nome', prop: 'name'},
    {name: 'Retenção', prop: 'retention'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private doctypeSrv: DoctypesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.doctypesList();
  }

  doctypesList() {
    this.doctypeSrv.doctypes(null).subscribe(
      (data) => {
        this.doctypes = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;
    this.doctypeSrv.doctypes(this.page).subscribe(
      (data) => {
        this.doctypes = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }
}
