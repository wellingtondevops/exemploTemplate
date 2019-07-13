import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  id: String;
  storeHouse: any;
  storeHouseForm: FormGroup;
  changeUp = false;

  constructor(
    private route: ActivatedRoute,
    private storeHouseSrv: StorehousesService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService
  ) { }

  ngOnInit() {

    this.storeHouseForm = this.fb.group({
      _id: '',
      name: this.fb.control('', [Validators.required]),
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getStoreHouse();

  }

  getStoreHouse() {
    this.storeHouseSrv.storehouse(this.id).subscribe(
      data => {
        this.storeHouse = data;
        this.storeHouseForm.patchValue({
          _id: this.storeHouse._id,
          name: data.name
        });
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      });
  }

  updateStoreHouse() {
    this.storeHouseSrv.updateStoreHouse(this.storeHouseForm.value).subscribe(data => {
      this.storeHouse = data;
      this.storeHouseForm.reset({
        _id: this.storeHouse._id,
        name: {value: this.storeHouse.name, disabled: true},
      });
      this.successMsgSrv.successMessages('Armazém alterado com sucesso.');
    },
    (error) => {
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

}
