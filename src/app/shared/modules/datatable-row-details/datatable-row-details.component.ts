import { Component, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-datatable-row-details',
  templateUrl: './datatable-row-details.component.html',
  styleUrls: ['./datatable-row-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DatatableRowDetailsComponent {
  @ViewChild('myTable') table: any;

  rows: any[] = [];
  expanded: any = {};
  timeout: any;

  constructor() {
    this.fetch(data => {
      this.rows = data;
    });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/100k.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

}
