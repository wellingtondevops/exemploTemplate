import { NgbdModalConfirmComponent } from './../../../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { CertificateService } from './../../../services/certificate/certificate.service';
import { routerTransition } from 'src/app/router.animations';
import { Component, OnInit } from '@angular/core';
import { Certificate } from 'src/app/models/certificate';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit {
  listCertificate: Certificate;
  loading = false;
  id;
  permissionEdit = false;
  permissionDelete = false;


  constructor(
    private certificateSrv: CertificateService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) { 
    this.id = sessionStorage.getItem('certificateId');
  }

  ngOnInit() {
    this.getCertificate();
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
  }

  getCertificate(){
    this.certificateSrv.simpleGetCertificate(this.id).subscribe(
      data => {
        this.listCertificate = data;
      }, error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    )
  }

  close() {
    this.activeModal.close('Sair');
  }

  open(name: string, id) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = id;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Empresa foi deletada com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar a empresa?',
      msgQuestionDeleteTwo: 'Todas as informações associadas a empresa serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(itemId => {
      this.delete(itemId);
    });
  }

  delete(id) {
    this.loading = true;
    this.certificateSrv.delete(id).subscribe(
      response => {
        this.loading = false;
        this.successMsgSrv.successMessages('Empresa deletada com sucesso.');
        this.activeModal.close('Excluir');
        this.close();
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
      }
    );
  }

}
