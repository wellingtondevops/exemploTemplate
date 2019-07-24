import { Component, OnInit, ViewChild } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Page } from 'src/app/models/page';

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
  page = new Page();

  constructor(
    private archiveSrv: ArquivesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {
    // this.setPage({ offset: 1 });
    this.listArquives();
  }

  listArquives() {
    this.archiveSrv.archives(null).subscribe((data) => {
      this.page.pageNumber = data._links.currentPage;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.archives = data.items;
    },
    (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR:', error);
    });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    this.archiveSrv.archives(this.page).subscribe(data => {
      this.page.pageNumber = data._links.currentPage;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
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
