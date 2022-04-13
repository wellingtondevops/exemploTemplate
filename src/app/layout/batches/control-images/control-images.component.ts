import { routerTransition } from 'src/app/router.animations';
import { Page } from 'src/app/models/page';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Batch } from 'src/app/models/batch';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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


    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private batchesSrv: BatchesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
    ) { }

    ngOnInit() {

        this.id = this.route.snapshot.paramMap.get('id');
        this.getBatch();
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

}
