import { Component, Input, Output, EventEmitter, Injectable, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { first } from 'rxjs/operators';

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
  firstMoment = false;
  @Output() setPage = new EventEmitter();
  @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
  @Output() show = new EventEmitter();
  constructor(
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    if (!this.firstMoment) {
      this.firstMoment = true;
      this.columns.push({name: '', cellTemplate: this.editTmpl });
      console.log(this.columns);
    }
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

  showView(value) {
    this.show.emit(value)
  }
}
