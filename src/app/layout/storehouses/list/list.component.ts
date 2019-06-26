import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Storehouse, StorehousesList } from 'src/app/models/storehouse';
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
  storehouses: StorehousesList;
  page: Pagination;
  columns = [
    {name: 'Nome', prop: 'name'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private storeHousesSrv: StorehousesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.getStoreHouses();
  }

  getStoreHouses() {
    this.storeHousesSrv.storeHouses(null).subscribe(
      (data) => {
        console.log(data);
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
