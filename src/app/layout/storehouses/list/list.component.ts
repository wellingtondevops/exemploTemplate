import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Storehouse } from 'src/app/models/storehouse';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  storehouses: Storehouse[];

  constructor(
    private storeHousesSrv: StorehousesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {
    this.getStoreHouses();
  }

  getStoreHouses() {
    this.storeHousesSrv.storeHouses().subscribe(
      (data) => { this.storehouses = data.items; },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }
}
