
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Batch } from 'src/app/models/batch';
import { Page } from 'src/app/models/page';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { FilesService } from 'src/app/services/files/files.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { routerTransition } from '../../../router.animations';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss'],
  animations: [routerTransition()]
})
export class ControlComponent implements OnInit {
  progressInfos: any = [];
  fileInfos: any = [];
  batch: Batch;
  batchImages: any;
  id: string;
  loading: Boolean = true;
  page = new Page();
  // pageImages = new Page();
  myFiles: any = [];
  uploadResponse: any = { status: 'progress', message: 0 };
  message: string;

  myForm = new FormGroup({
    file: new FormControl('', [Validators.required])
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private batchesSrv: BatchesService,
    private filesSrv: FilesService,
  ) { }

  ngOnInit() {
    $(document).ready(function () {
      // var $modal = $('#right-bottom');
      $('.cus-modal').click(function () {
        $('body').removeClass('cus-modal-open');
        $('.in').removeClass('in');
      });
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getBatch();
  }

  openModal() {
    $('body').addClass('cus-modal-open');
    const target = '#right-bottom';
    $(target).addClass('in');
  }

  selectedImg(e) {
    console.log(e.target.id)
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      // files
      this.myFiles.push(event.target.files[i]);
    }
  }

  getBatch() {
    this.loading = true;
    this.batchesSrv.batch(this.id).subscribe(data => {
      this.loading = false;
      this.batch = data;
      this.getBatchImages(1,50);
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
      this.errorMsg.errorMessages(error);
    })
  }

  getBatchImages(pageInfo = null, size = 50) {
    this.loading = true;
    if (pageInfo) {
      this.page.pageNumber = pageInfo;
    } 
    
    this.batchesSrv.batchImages(this.id, this.page, size).subscribe(data => {
      this.loading = false;
      this.batchImages = data.items;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error)
    })
  }

  clearUpload(){
    this.progressInfos = [];
    this.myFiles = [];
  }

  submit() {
    const formData = new FormData();
    formData.append('document', this.batch.doct._id);
    formData.append('company', this.batch.company._id);
    formData.append('batch', this.batch._id);
    formData.append('ind', 'false');
    for (var i = 0; i < this.myFiles.length; i++) {
      this.progressInfos.push({ value: 0, fileName: this.myFiles[i].name, class: 'progress-bar progress-bar-info progress-bar-striped' });
      this.openModal();
      formData.append("files", this.myFiles[i]);
      this.upload(formData, i)
    }
  }

  upload(formData, i) {
    this.filesSrv.filesProgress(formData).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progressInfos[i].value = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        this.fileInfos[i] = event.body[0];
        this.progressInfos[i].class = 'progress-bar bg-success progress-bar-striped';
        this.batchImages.push(event.body[0]);
        this.page.totalElements++;
      }
    }, error => {
      this.progressInfos[i].class = 'progress-bar bg-danger progress-bar-striped';
    });
  }

  deleteBatch() {
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
