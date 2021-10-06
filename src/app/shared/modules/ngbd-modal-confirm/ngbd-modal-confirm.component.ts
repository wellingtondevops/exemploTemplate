import { Component, Input, Output, EventEmitter } from '@angular/core';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
  selector: 'ngbd-modal-confirm',
  templateUrl: './ngbd-modal-confirm.html',
styleUrls: ['./ngbd-modal-confirm.scss'],
})


export class NgbdModalConfirmComponent {
  @Input() item: any;
  @Input() data = {
    titleModal: '',
    msgQuestionDeleteOne: '',
    msgQuestionDeleteTwo: '',
  };
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(
    public modal: NgbActiveModal,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  deleteBack() {
    this.delete.emit(this.item);
  }
  open(content) {
    this.modalService.open(content, { size: 'lg' });
  }
}
