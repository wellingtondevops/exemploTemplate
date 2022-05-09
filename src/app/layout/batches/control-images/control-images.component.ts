import { SaveLocal } from 'src/app/storage/saveLocal';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { routerTransition } from 'src/app/router.animations';
import { Page } from 'src/app/models/page';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Batch } from 'src/app/models/batch';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-control-images',
    templateUrl: './control-images.component.html',
    styleUrls: ['./control-images.component.scss'],
    animations: [routerTransition()],
})
export class ControlImagesComponent implements OnInit {
    id: string;
    loading: Boolean = true;
    batch: Batch;
    page = new Page();
    batchImages: any;
    pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
    document: Document;
    image: any;
    urlFile: any = '';
    firstPageUrl: any  = '';
    pictureId: any = '';
    pictures: any = '';
    isPdf = false;


    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private batchesSrv: BatchesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private documentSrv: DocumentsService,
        private localStorageSrv: SaveLocal,


    ) { }

    ngOnInit() {
        $(function () {
            $("#selectable").selectable();
        });
        this.id = this.route.snapshot.paramMap.get('id');
        this.getBatch();

    }

    getBatch() {
        this.page.pageNumber = 1;
        this.batchesSrv.imagens(this.id, this.page, 1).subscribe(data => {
            this.image = data.items[0];
            if (data.items.length >= 1) {
                this.urlFile = data.items[0].firstPageUrl;
                this.pictureId = data.items[0]._id;
                this.pictures = this.pictureId;
                this.urlFile.indexOf('.pdf') !== -1 ? this.isPdf = true : '';
                this.getBatchImages();
            } else {
                this.getBatchImages();
                setTimeout(function () { $('#open')[0].click(); }, 700);


            }
        }, error => {
            console.log('ERROR: ', error);
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

}
