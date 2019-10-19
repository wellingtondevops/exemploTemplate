import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { routerTransition } from '../../../router.animations';
import { Archive } from 'src/app/models/archive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  loading: boolean = false;
  searchForm: FormGroup;

  constructor(
    private archiveSrv: ArquivesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // this.setPage({ offset: 0 });
    this.searchForm = this.fb.group({
      search: this.fb.control('')
    });
  }

  setPage(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.archiveSrv.archives(this.page, null, this.searchForm.value.search).subscribe(data => {
      this.page.pageNumber = data._links.currentPage - 1;
      this.page.totalElements = data._links.foundItems;
      this.archives = data.items;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log('ERROR: ', error);
    });
  }

  toggleExpandRow(row) {
    // console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // console.log('Detail Toggled', event);
  }

  showView(value) {
    if (value.type === 'click') {
      this._route.navigate(['/archives/get', value.row._id]);
    } else if (value.type === 'mouseenter') {
      this.toggleExpandRow(value.row)
    }
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

  getArchive() {
    this.setPage({ offset: 0 })
  }

}
