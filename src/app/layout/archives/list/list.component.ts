import { Component, OnInit, ViewChild } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  archives: Archive[];
  archivesCol: any[];
  page: Pagination = {
    currentPage: 0,
    totalPage: 0,
    next: '',
    foundItems: 0,
    self: ''
  };

  constructor(
    private archiveSrv: ArquivesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {
    this.setPage({ offset: 1 });
    this.listArquives();
  }

  listArquives() {
    this.archiveSrv.archives(null).subscribe((data) => {
      this.page = data._links;
      this.archives = data.items;
    },
    (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR:', error);
    });
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;

   if (pageInfo.offset >= 1) {
      this.page.currentPage = pageInfo.offset + 1;
    }

    this.archiveSrv.archives(this.page).subscribe(data => {
      this.page = data._links;
      this.archives = data.items;
    });
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }

  guardType(value) {
    let res = '';
    switch (value) {
      case 'GERENCIADA':
         res = 'G';
         break;
    }
    return res;
  }

}
