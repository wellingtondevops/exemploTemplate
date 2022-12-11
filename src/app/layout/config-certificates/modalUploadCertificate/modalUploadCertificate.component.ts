import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { CertificateService } from './../../../services/certificate/certificate.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from 'src/app/router.animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalUploadCertificate',
  templateUrl: './modalUploadCertificate.component.html',
  styleUrls: ['./modalUploadCertificate.component.scss'],
  animations: [routerTransition()]
})
export class ModalUploadCertificateComponent implements OnInit {
  uploadForm: FormGroup;
  loading = false;
  file;
  uploadResponse: any = { status: 'progress', message: 0 };
  errorUpload: boolean = null;
  savedFile = false;
  nameFile: string;
  arrayBuffer: any;


  constructor(
    private readonly activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private readonly certificateSrv: CertificateService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private _route: Router,

  ) { }

  ngOnInit() {
    this.uploadForm = this.fb.group({
      password: this.fb.control('', [Validators.required]),
    });
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList = null) {
    if (event) {
      this.nameFile = event.item(0).name;
      const file = event && event.item(0);
      this.file = file;
    }
  }

  createCertificate(event, data) {
    this.loading = true;
    const formData = new FormData();
    formData.append('file', this.file);
    formData.append('password', this.uploadForm.value.password);

    this.certificateSrv.newCertificate(formData).subscribe(data => {
      console.log(data);
      if (data.status && data.status === 'progress') {
        this.uploadResponse.message = data.message;
        this.uploadResponse.status = data.status;
        this.errorUpload = false;
      }
      if (Array(data)) {
        this.savedFile = true;
        this.successMsgSrv.successMessages('Upload realizado com sucesso.');
        this.activeModal.close('Excluir');
        this.close();


      }
    }, error => {
      this.loading = false;
      //      this.uploadResponse.message = 10;
      //    this.errorUpload = true;
      this.errorMsg.errorMessages(error);
      console.log('ERROR ', error);
    });
  }



  close() {
    this.activeModal.close('Sair');
  }


}
