import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Archive } from 'src/app/models/archive';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit {
  @Input() public arch;
  id;

  loading: Boolean = false;
  isNew: Boolean = false;
  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirmEdit: boolean = false;
  permissionCancelEdit: boolean = false;
  isUsers = false;

  archive: Archive;

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
  ) { }

  // INICIALIZAÇÃO

  ngOnInit() {
  }

  // RESOURCES

  // EDIT

  editArchive() {

  }

  // DELETE

  open(name, id) {

  }
}
