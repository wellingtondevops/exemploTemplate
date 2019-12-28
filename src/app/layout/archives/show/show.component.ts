import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { Archive } from 'src/app/models/archive';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { toFormData } from '../../../utils/form-data/form-data';
import { FilesService } from 'src/app/services/files/files.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { PicturesService } from 'src/app/services/pictures/pictures.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ModalProgressComponent } from 'src/app/shared/modules/modal-progress/modal-progress.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as $ from 'jquery';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

const MODALPROGRESS = {
  focusFirst: ModalProgressComponent
};

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;
  }
  .light-blue-backdrop {
    background-color: #5cb3fd;
  }
  .modal-dialog-centered {
    display: flex;
    flex-direction: column-reverse;
    float: right;
  }
`]
})
export class ShowComponent implements OnInit {
  progressModal = {
    customClass: 'modal-style'
  }
  id: string;
  archive: Archive;
  uploadResponse: any = { status: 'progress', message: 0 };
  error: string;
  loading: Boolean = true;
  first: boolean = true;
  errorUpload: boolean = null;
  file: any;
  savedFile: boolean = false;
  @ViewChild("content") content: TemplateRef<any>;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private archiveSrv: ArquivesService,
    private picturesSrv: PicturesService,
    private filesSrv: FilesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
    public ngxSmartModalService: NgxSmartModalService
  ) { }

  uploadFile = new FormGroup({
    storehouse: new FormControl(''),
    volume: new FormControl(''),
    company: new FormControl(''),
    archive: new FormControl(''),
    file: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    var height = $("nav.sidebar").height()
    $('.file').css('height', height - 30);
    this.id = this.route.snapshot.paramMap.get('id');
    this.getArquive();
  }

  getArquive() {
    this.archiveSrv.archive(this.id).subscribe(data => {
      this.archive = data;
      this.picture(this.archive._id);
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
    })
  }

  picture(archive_id) {
    this.picturesSrv.picture(archive_id).subscribe(data => {
      this.file = data;
    })
  }

  mapLabel(labels, tags) {
    var obj = ''
    labels.map((item, i) => {
      if (i === (labels.length - 1)) {
        obj += `${item.namefield}: ${tags[i]}`
      } else {
        obj += `${item.namefield}: ${tags[i]} | `
      }
    })
    return obj
  }

  postFile(data) {
    this.uploadFile.patchValue({
      archive: this.archive._id,
      volume: this.archive.volume._id,
      company: this.archive.company._id,
      storehouse: this.archive.storehouse._id,
      file: data
    })
    this.submit();
  }

  submit() {
    // this.loading = true;
    const formData = new FormData();
    formData.append('file', this.uploadFile.get('file').value);
    formData.append('storehouse', this.uploadFile.get('storehouse').value);
    formData.append('volume', this.uploadFile.get('volume').value);
    formData.append('archive', this.uploadFile.get('archive').value);
    formData.append('company', this.uploadFile.get('company').value);
    this.filesSrv.file(formData).subscribe(data => {
      if (data.status && data.status === 'progress') {
        this.uploadResponse.message = data.message;
        this.uploadResponse.status = data.status;
        this.errorUpload = false;
      }
      if (data._id) {
        this.savedFile = true;
        // this.successMsgSrv.successMessages('Upload realizado com sucesso.');
      }
      this.picture(this.archive._id);
    }, error => {
      this.loading = false;
      this.uploadResponse.message = 10;
      this.uploadResponse.status = 'progress';
      this.errorUpload = true;
      this.errorMsg.errorMessages(error);
      console.log("ERROR ", error)
    })
  }

  open(name: string, file) {
    const modalRef = this.modalService.open(MODALS[name], {
      keyboard: false, backdrop: 'static', windowClass: 'modal-style',
    });
    modalRef.componentInstance.item = file;
    modalRef.componentInstance.data = {
      titleModal: 'Deletar Arquivo',
      msgConfirmDelete: 'Arquivo foi deletada com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o arquivo?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao arquivo serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  openProgress(name: string) {
    const modalRef = this.modalService.open(MODALPROGRESS[name], {
      keyboard: true, backdrop: 'static', windowClass: 'dark-modal',
      backdropClass: 'light-blue-backdrop', centered: true,
      size: 'sm'
    });
    modalRef.componentInstance.progress = this.uploadResponse;
  }

  openBackDropCustomClass(content) {
    this.modalService.open(content, { centered: true, keyboard: true, backdrop: 'static', backdropClass: 'light-blue-backdrop', windowClass: 'modal-style' });
  }

  delete(file) {
    this.filesSrv.delete(file).subscribe(res => {
      this.successMsgSrv.successMessages('Arquivo deletado com sucesso.');
      this.file = null;
      this.archive = null;
      window.location.reload()
    }, error => {
      console.log(error)
      this.errorMsg.errorMessages(error);
    })
  }
}
