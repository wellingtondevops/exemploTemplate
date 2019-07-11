import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Storehouse, StorehousesList } from 'src/app/models/storehouse';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  storehouses: StorehousesList = {
    _links: {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  page = {
    currentPage: 0,
    totalPage: 0
  };

  columns = [
    {name: 'Nome', prop: 'name'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private _route: Router,
    private storeHousesSrv: StorehousesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.setPage({ offset: 1 });
    this.getStoreHouses();
  }

  getStoreHouse(storeHouse) {
    this._route.navigate(['/storehouses/get', storeHouse]);
  }

  editStoreHouse(storeHouse) {
    this._route.navigate(['/storehouses/edit', storeHouse]);
  }

  getStoreHouses() {
    this.storeHousesSrv.storeHouses(null).subscribe(
      (data) => {
        this.storehouses = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;

    if (pageInfo.offset >= 1) {
      this.page.currentPage = pageInfo.offset + 1;
    }

    this.storeHousesSrv.storeHouses(this.page).subscribe(
      (data) => {
        this.storehouses = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }
}
