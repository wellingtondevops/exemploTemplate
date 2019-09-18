import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { Volume, VolumeList } from 'src/app/models/volume';
import { Router } from '@angular/router';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { Page } from 'src/app/models/page';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    height: any;
    loading: Boolean = true;
    volumes: VolumeList = {
        _links: {
            currentPage: 0,
            foundItems: 0,
            next: '',
            self: '',
            totalPage: 0
        },
        items: []
    };
    page = new Page();
    columns = [
        { name: 'Empresa', prop: 'company.name', width: 250 },
        { name: 'Descrição', prop: 'description' },
        { name: 'Ármazem', prop: 'storehouse.name' },
        { name: 'Localização', prop: 'location', width: 70 },
        /* { name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType } },
        { name: 'Status', prop: 'status', width: 50, pipe: { transform: this.pipes.status } },
        { name: 'Referência', prop: 'reference', width: 70 },
        { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } } */
    ];

    constructor(
        private el: ElementRef,
        private volumeSrv: VolumesService,
        private _route: Router,
        private pipes: Pipes,
        private errorMsg: ErrorMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private successMsgSrv: SuccessMessagesService
    ) {}

    ngOnInit() {
        this.listVolumes();
    }

    listVolumes() {
        this.volumeSrv.volumes(null).subscribe(
            data => {
                this.loading = false;
                this.volumes = data;
                this.page.pageNumber = data._links.currentPage;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
            },
            error => {
                this.loading = false;
                console.log('ERROR: ', error);
            }
        );
    }

    getVolume(volume) {
        this._route.navigate(['/volumes/get', volume]);
    }

    setPage(pageInfo) {
        this.page.pageNumber = pageInfo.offset;

        this.volumeSrv.volumes(this.page).subscribe(
            data => {
                console.log(data);
                this.volumes = data;
                this.page.pageNumber = data._links.currentPage;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}
