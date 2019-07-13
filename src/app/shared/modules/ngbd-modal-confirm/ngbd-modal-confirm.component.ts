import { Component, Input } from '@angular/core';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Deletar Armazém</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>{{ data.msgQuestionDeleteOne }}</strong></p>
    <p>{{ data.msgQuestionDeleteTwo }}
    <span class="text-danger">Essa operação poderá não ser desfeita.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close(deleteItem())">Ok</button>
  </div>
  `
})


export class NgbdModalConfirmComponent {
  @Input() storehouse: any;
  @Input() data: Object;
  constructor(
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private storeHousesSrv: StorehousesService,
    public modal: NgbActiveModal
  ) {
  }

  deleteItem() {
    this.storeHousesSrv.deleteStoreHouse(this.storehouse).subscribe(
      (data) => {
        this.successMsgSrv.successMessages('Armazém deletado com sucesso.');
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }
}
