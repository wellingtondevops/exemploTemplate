import { Component, OnInit, Input, Output, EventEmitter, Injectable, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { first } from 'rxjs/operators';
import { Page } from 'src/app/models/page';

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
  page = new Page();
  firstMoment = false;
  @Output() setPage = new EventEmitter();
  @ViewChild('showTmpl') showTmpl: TemplateRef<any>;
  @Output() show = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() delete = new EventEmitter();

  constructor(
  ) {
    this.page.pageNumber = 1;
    this.page.size = 50;
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.firstMoment) {
      this.firstMoment = true;
      this.columns.push({name: '', cellTemplate: this.showTmpl });
    }
    // tslint:disable-next-line:forin
    for (const propName in changes) {
        const change = changes[propName];
        this.items = change.currentValue.items;
        this.page.totalElements = change.currentValue._links.foundItems;
        this.page.pageNumber = change.currentValue._links.currentPage;
    }
  }

  pagination(pageInfo) {
    console.log(pageInfo)
    pageInfo.offset += 1;
    this.setPage.emit(pageInfo);
  }

  showView(value) {
    this.show.emit(value);
  }

  editView(value) {
    this.edit.emit(value);
  }

  deleteItem(value) {
    this.delete.emit(value);
  }
}
