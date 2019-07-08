import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  storeHouse: Object;
  storeHouseForm: FormGroup;

  constructor(
    private storeHouseSrv: StorehousesService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {

    this.storeHouseForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
    });

  }

  postStoreHouse() {
    console.log(this.storeHouseForm.value);

    this.storeHouseSrv.newStoreHouse(this.storeHouseForm.value).subscribe(
      data => {
        if (data._id) {
          this.successMsgSrv.successMessages('Armazém cadastrado com sucesso.');
        }
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

}
