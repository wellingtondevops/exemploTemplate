import { BatchSheetNameService } from './../../../services/batchSheetName/batch-sheet-name.service';
import { BatchSheetName } from './../../../../.././src/app/models/batchSheetName';
import { SaveLocal } from './../../../storage/saveLocal';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Batch } from 'src/app/models/batch';
import { Page } from 'src/app/models/page';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { FilesService } from 'src/app/services/files/files.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { routerTransition } from '../../../router.animations';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import * as $ from 'jquery';
import _ from 'lodash';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { DomSanitizer } from '@angular/platform-browser';


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
    _id: any;
    loading: Boolean = true;
    page = new Page();
    page2 = new Page();
    searchForm: FormGroup;
    // pageImages = new Page();
    myFilesInputSelect: any = [];
    myFiles: any = [];
    uploadResponse: any = { status: 'progress', message: 0 };
    message: string;
    myForm = new FormGroup({
        file: new FormControl('', [Validators.required]),
    });
    sheetnames: BatchSheetName[];

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private batchesSrv: BatchesService,
        private sheetSvr: BatchSheetNameService,
        private filesSrv: FilesService,
        private pipes: Pipes,
        private domSanitizer: DomSanitizer,
        private localStorageSrv: SaveLocal,

    ) { }


    ngOnInit() {
        /* $(document).ready(function () {
            // var $modal = $('#right-bottom');
            $('.cus-modal').click(function () {
                $('body').removeClass('cus-modal-open');
                $('.in').removeClass('in');
            });
        }); */

        this.searchForm = this.fb.group({
            sheetname: this.fb.control(''),
        })
        this.id = this.route.snapshot.paramMap.get('id');
        this.getBatch();
        this.getArchive();
    }


    setDataIndexForm(index) {
        if(index) {
            this.searchForm.patchValue({
                sheetname: index.sheetname,
            });
        }
    }

    openModal() {
        $('body').addClass('cus-modal-open');
        const target = '#right-bottom';
        $(target).addClass('in');
    }

    close() {
        $('body').removeClass('cus-modal-open');
        $('.in').removeClass('in');
        this.clearUpload();
    }

    selectedImg(e) {
        console.log(e.target.id);
    }


    isPdf(img) {
        console.log(1);
        return this.pipes.isPdf(img.url);
    }

    sanitizeUrl(url) {
        return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
    }

    onFileChange(event) {
        this.myFilesInputSelect = [];
        for (let i = 0; i < event.target.files.length; i++) {
            // files
            this.myFilesInputSelect.push(event.target.files[i]);
        }
    }

    getBatch() {
        this.loading = true;
        this.batchesSrv.batch(this.id).subscribe(data => {
            this.loading = false;
            this.batch = data;
            this.getBatchImages(1, 24);
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
            this.errorMsg.errorMessages(error);
        });
    }

    getBatchImages(pageInfo = null, size = 24) {
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
            this.errorMsg.errorMessages(error);
        });
    }

    clearUpload() {
        this.progressInfos = [];
        this.myForm.patchValue({
            file: '',
        });
        this.myFiles = [];
    }

    submit() {
        const formData = new FormData();
        formData.append('document', this.batch.doct._id);
        formData.append('company', this.batch.company._id);
        formData.append('batch', this.batch._id);
        formData.append('ind', 'false');
        for (let i = 0; i < this.myFilesInputSelect.length; i++) {
            console.log(this.myFiles);
            this.myFiles.push(this.myFilesInputSelect[i]);
            this.progressInfos.push({ value: 0, fileName: this.myFiles[i].name, file: this.myFiles[i], class: 'progress-bar progress-bar-info progress-bar-striped' });
            this.openModal();
            formData.delete('files');
            formData.append('files', this.myFiles[i]);
            let last = this.myFiles.length;
            last -= 1;
            this.upload(formData, last);
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
                this.progressInfos[i].error = false;
                this.page.totalElements++;
            }
        }, error => {
            console.log(error);
            this.progressInfos[i].error = true;
            this.progressInfos[i].class = 'progress-bar bg-danger progress-bar-striped';
        });
    }

    reUpload(file, position) {
        const formData = new FormData();
        formData.append('document', this.batch.doct._id);
        formData.append('company', this.batch.company._id);
        formData.append('batch', this.batch._id);
        formData.append('ind', 'false');
        formData.delete('files');
        formData.append('files', this.myFiles[position]);
        this.upload(formData, position);
    }

    deleteBatch() {
        this.loading = true;
        this.batchesSrv.delete(this.id).subscribe(data => {
            this.loading = false;
            this.successMsgSrv.successMessages('Lote excluído com sucesso.');
            this._route.navigate(['/batches']);

        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
            this.errorMsg.errorMessages(error);
        });
    }

    toIndex() {
        this._route.navigate(['/index', this.id]);
    }




    setPage(pageInfo) {
        this.loading = true;
        if (pageInfo && pageInfo.offset) {
            this.page2.pageNumber = pageInfo.offset;
        } else {
            pageInfo = { offset: 0 },
                this.page2.pageNumber = pageInfo.offset;
        }

        this.localStorageSrv.save('sheetname', this.searchForm.value);

        const newSearch = {
            sheetname: null,
        };
        newSearch.sheetname = this.searchForm.value.sheetname;

        const searchValue = _.omitBy(newSearch, _.isNil);
        this.batchesSrv.searchSheetName(this.batch._id, this.page2, searchValue).subscribe(data => {
            if (data.items.length > 0) {

                this.sheetnames = data.items;
                this.page2.pageNumber = data._links.currentPage - 1;
                this.page2.totalElements = data._links.foundItems;
                this.page2.size = data._links.totalPage;
                this.loading = false;
            }
        }, error => {
            this.loading = false;
            console.log('ERROR: ', error);
            this.errorMsg.errorMessages(error);
        });
    }

    getArchive() {
          this.setPage({ offset: 0 });
    }

    clear() {
        this.localStorageSrv.clear('sheetname');

        this.searchForm.patchValue({
            sheetname: null
        });
    }
    deleteSheet(_id) {
        this.loading = true;
        this.sheetSvr.delete(_id).subscribe(data => {
            this.loading = false;
            this.successMsgSrv.successMessages('Planilha excluída com sucesso.');
        }, error => {
            console.log('ERROR: ', error);
            this.loading = false;
            this.errorMsg.errorMessages(error);
        });
    }

}
