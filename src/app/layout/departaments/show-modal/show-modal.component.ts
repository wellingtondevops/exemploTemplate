import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

import * as $ from 'jquery';
import * as moment from 'moment';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  animations: [routerTransition()]

})
export class ShowModalComponent implements OnInit {
  progressModal = {
    customClass: 'modal-style'
  };
  id: string; // VERIFICAR
  modalOptions:NgbModalOptions;
  closeResult: string;
  archive: Archive; // EDITAR ARQUIVO PRA DEPARTAMENTO
  uploadResponse: any = { status: 'progress', message: 0 }; // VERIFICAR
  error: string;
  loading: Boolean = true;
  first = true; // VERIFICAR
  errorUpload: boolean = null; // VERIFICAR
  file: any = ''; // VERIFICAR
  savedFile = false; // VERIFICAR
  height = 0;
  archiveCreateForm: FormGroup; // EDITAR ARQUIVO PRA DEPARTAMENTO
  permissionEdit = false; // VERIFICAR
  permissionDelete = false; // VERIFICAR
  isUsers = false; // VERIFICAR
  startCurrentDate = false;
  inputStartCurrentDate = '';

  @ViewChild('content') content: TemplateRef<any>; // VERIFICAR

  uploadFile = new FormGroup({
    storehouse: new FormControl(''), // VERIFICAR
    volume: new FormControl(''), // VERIFICAR
    company: new FormControl(''), // VERIFICAR
    archive: new FormControl(''), // EDITAR ARQUIVO PRA DEPARTAMENTO
    doct: new FormControl(''), // VERIFICAR
    file: new FormControl(null, [Validators.required]) // VERIFICAR
  });


  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private archiveSrv: ArquivesService, // EDITAR ARQUIVO PRA DEPARTAMENTO
    private picturesSrv: PicturesService, // VERIFICAR
    private filesSrv: FilesService, // VERIFICAR
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal // VERIFICAR
    ) {

      this.modalOptions = {
        backdrop: 'static',
        backdropClass: 'customBackdrop',
        keyboard: false,
        windowClass: 'customModal'
      };

    }

  ngOnInit() {
    this.archiveCreateForm = this.fb.group({ // EDITAR ARQUIVO PRA DEPARTAMENTO
      create: this.fb.control(''), // VERIFICAR
      indexBy: this.fb.control('') // VERIFICAR
    });

      this.height = $('nav.sidebar').height();
      this.id = this.route.snapshot.paramMap.get('id'); // VERIFICAR
      this.getArquive(); // VERIFICAR
      this.startCurrentDate = JSON.parse(window.localStorage.getItem('routes'))[0].startcurrentdate; // VERIFICAR
  
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change; // VERIFICAR
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete; // VERIFICAR
      this.isUsers = JSON.parse(localStorage.getItem('userExternal')); // VERIFICAR
      setTimeout(function() {$('#openMod')[0].click(); }, 0); // VERIFICAR
  }

  returnDateCreate(create) {
    return moment(create).format('DD/MM/YYYY hh:mm');
  }

  returnDate(create) {
    return moment(create).format('DD/MM/YYYY');
  }

  setStartCurrentDate() {
    const data = { startCurrentDate: moment(this.inputStartCurrentDate).format('DD/MM/YYYY') };
    this.loading = true;
    this.archiveSrv.patchStartCurrentDate(this.id, data).subscribe(res => {
      this.getArquive();  // VERIFICAR
      this.loading = false;
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      console.log('ERROR ', error);
    });
  }

  getArquive() {
    this.loading = true;
    this.archiveSrv.archive(this.id).subscribe(data => { // VERIFICAR
      this.archive = data; // VERIFICAR
      this.archiveCreateForm.patchValue({ // VERIFICAR
        create: moment(data.create).format('DD/MM/YYYY hh:mm'),
        indexBy: data.author && data.author.email ? data.author.email : 'Sem e-mail'
      });
      this.file = data.picture; // VERIFICAR
      $('.file').css('height', 'auto');
      this.loading = false;
    }, error => {
      $('.file').css('height', this.height - 30);
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  picture(archive_id) { // VERIFICAR
    this.picturesSrv.picture(archive_id).subscribe(data => { // VERIFICAR
      this.file = data;
      $('.file').css('height', 'auto');
    }, (error) => {
      $('.file').css('height', this.height - 30);
    });
  }

  mapLabel(labels, tags) { // VERIFICAR
    let obj = '';
    labels.map((item, i) => {
      if (i === (labels.length - 1)) {
        obj += `${item.namefield}: ${tags[i]}`;
      } else {
        obj += `${item.namefield}: ${tags[i]} | `;
      }
    });
    return obj;
  }

  postFile(data) { // VERIFICAR
    this.uploadFile.patchValue({
      archive: this.archive._id, // EDITAR ARQUIVO PRA DEPARTAMENTO
      volume: this.archive.volume._id, // EDITAR ARQUIVO PRA DEPARTAMENTO
      company: this.archive.company._id, // EDITAR ARQUIVO PRA DEPARTAMENTO
      storehouse: this.archive.storehouse._id, // EDITAR ARQUIVO PRA DEPARTAMENTO
      doct: this.archive.doct._id, // EDITAR ARQUIVO PRA DEPARTAMENTO
      file: data // VERIFICAR
    });
    this.submit();
  }

  submit() {
    // this.loading = true;
    const formData = new FormData();
    formData.append('files', this.uploadFile.get('file').value); // EDITAR ARQUIVO PRA DEPARTAMENTO
    formData.append('storehouse', this.uploadFile.get('storehouse').value); // EDITAR ARQUIVO PRA DEPARTAMENTO
    formData.append('volume', this.uploadFile.get('volume').value); // EDITAR ARQUIVO PRA DEPARTAMENTO
    formData.append('archive', this.uploadFile.get('archive').value); // EDITAR ARQUIVO PRA DEPARTAMENTO
    formData.append('doct', this.uploadFile.get('doct').value); // EDITAR ARQUIVO PRA DEPARTAMENTO
    formData.append('company', this.uploadFile.get('company').value); // EDITAR ARQUIVO PRA DEPARTAMENTO
    this.filesSrv.fileS(formData).subscribe(data => { // VERIFICAR
      if (data.status && data.status === 'progress') {
        this.uploadResponse.message = data.message;
        this.uploadResponse.status = data.status;
        this.errorUpload = false;
      }
      if (data._id) {
        this.savedFile = true; // VERIFICAR
        // this.successMsgSrv.successMessages('Upload realizado com sucesso.');
      }
      this.picture(this.archive._id); // EDITAR ARQUIVO PRA DEPARTAMENTO
    }, error => { // VERIFICAR
      this.loading = false;
      this.uploadResponse.message = 10;
      this.uploadResponse.status = 'progress';
      this.errorUpload = true;
      this.errorMsg.errorMessages(error);
      console.log('ERROR ', error);
    });
  }

  open(name: string, file) { // VERIFICAR
    const modalRef = this.modalService.open(MODALS[name], { // VERIFICAR
      keyboard: false, backdrop: 'static', windowClass: 'modal-style',
    });
    modalRef.componentInstance.item = file; // VERIFICAR
    modalRef.componentInstance.data = {
      titleModal: 'Deletar Arquivo', // EDITAR ARQUIVO PRA DEPARTAMENTO
      msgConfirmDelete: 'Arquivo foi deletada com sucesso.', // EDITAR ARQUIVO PRA DEPARTAMENTO
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o arquivo?', // EDITAR ARQUIVO PRA DEPARTAMENTO
      msgQuestionDeleteTwo: 'Todas as informações associadas ao arquivo serão deletadas.' // EDITAR ARQUIVO PRA DEPARTAMENTO
    };
    modalRef.componentInstance.delete.subscribe(item => { // VERIFICAR
      this.delete(item);
    });
  }

  openBackDropCustomClass(content) { // VERIFICAR
    this.modalService.open(content, { centered: true, keyboard: true, backdrop: 'static', backdropClass: 'light-blue-backdrop', windowClass: 'modal-style' });
  }

  delete(file) {
    this.filesSrv.delete(file).subscribe(res => { // EDITAR ARQUIVO PRA DEPARTAMENTO
      this.successMsgSrv.successMessages('Arquivo deletado com sucesso.'); // EDITAR ARQUIVO PRA DEPARTAMENTO
      this.file = null; // EDITAR ARQUIVO PRA DEPARTAMENTO
      this.archive = null; // EDITAR ARQUIVO PRA DEPARTAMENTO
      window.location.reload();
    }, error => {
      console.log(error);
      this.errorMsg.errorMessages(error);
    });
  }

  editArchive(archive) { // EDITAR ARQUIVO PRA DEPARTAMENTO
    this._route.navigate(['/archives/edit', archive]); // EDITAR ARQUIVO PRA DEPARTAMENTO
  }

  openMod(content) { // VERIFICAR
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.redirect();
  }

  private getDismissReason(reason: any): string { // VERIFICAR
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  redirect() {
    setTimeout(() => {
        this._route.navigate([`/${'archives'}`]); // EDITAR ARQUIVO PRA DEPARTAMENTO
    }, 1000 );
  }
}
