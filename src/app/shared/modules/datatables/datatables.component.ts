import { Component, OnInit, Input, Output, EventEmitter, Injectable, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-datatables',
    templateUrl: './datatables.component.html',
    styleUrls: ['./datatables.component.scss']
})
@Injectable()
export class DatatablesComponent implements OnInit {
  items: any = [];
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

  ngOnInit() {
    this.page = {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.firstMoment) {
      this.firstMoment = true;
      this.columns.push({name: '', cellTemplate: this.editTmpl });
    }
    // tslint:disable-next-line:forin
    for (const propName in changes) {
        const change = changes[propName];
        this.items = change.currentValue.items;
        this.page = change.currentValue._links;
    }
  }

  pagination(pageInfo) {
    this.setPage.emit(pageInfo);
  }

  showView(value) {
    this.show.emit(value);
  }
}
