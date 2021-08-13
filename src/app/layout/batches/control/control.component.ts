import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Batch } from 'src/app/models/batch';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { routerTransition } from '../../../router.animations';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  animations: [routerTransition()]
})
export class ControlComponent implements OnInit {
  batch: Batch;
  id: string;
  loading: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private batchesSrv: BatchesService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBatch();
  }

  getBatch(){
    this.loading = true;
    this.batchesSrv.batch(this.id).subscribe(data => {
      this.loading = false;
      this.batch = data;
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
      this.errorMsg.errorMessages(error);
    })
  }

  deleteBatch(){
    this.loading = true;
    this.batchesSrv.delete(this.id).subscribe(data => {
      this.loading = false;
      this.successMsgSrv.successMessages('Lote excluído com sucesso.');
      
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
      this.errorMsg.errorMessages(error);
    })
  }

}
