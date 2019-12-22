import { Component, OnInit } from '@angular/core';
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

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  id: string;
  archive: Archive;
  uploadResponse = { status: '', message: '' };
  error: string;
  loading: Boolean = true;
  file: any;
  savedFile: boolean = false;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    private archiveSrv: ArquivesService,
    private picturesSrv: PicturesService,
    private filesSrv: FilesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
  ) { }

  uploadFile = new FormGroup({
    storehouse: new FormControl(''),
    volume: new FormControl(''),
    company: new FormControl(''),
    archive: new FormControl(''),
    file: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
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

  deleteFile(file) {
    console.log(file);
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
        this.uploadResponse = data;
      }
      if (data._id) {
        this.uploadResponse = data;
        this.savedFile = true;
        this.successMsgSrv.successMessages('Upload realizado com sucesso.');
      }
      this.picture(this.archive._id);
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      this.error = error;
      console.log("ERROR ", error)
    })
  }

  open(name: string, file) {
    const modalRef = this.modalService.open(MODALS[name]);
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
