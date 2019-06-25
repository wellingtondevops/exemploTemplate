import { Component, Input, Output, EventEmitter, Injectable, SimpleChanges } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';

@Component({
    selector: 'app-datatables',
    templateUrl: './datatables.component.html',
    styleUrls: ['./datatables.component.scss']
})
@Injectable()
export class DatatablesComponent {
    items: any;
    @Input() data: any;
    @Input() columns: any;
    page: Pagination;
    @Output() setPage = new EventEmitter();


    constructor(
    ) {
    }

    ngOnChanges(changes: SimpleChanges) {
      // tslint:disable-next-line:forin
      for (const propName in changes) {
          const change = changes[propName];
          console.log('change', change);
          this.items = change.currentValue.items;
          this.page = change.currentValue._links;
      }
  }

    pagination(pageInfo) {
      this.setPage.emit(pageInfo);
    }
}
