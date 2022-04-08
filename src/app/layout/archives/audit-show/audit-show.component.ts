import { IntroJsService } from './../../../services/introJs/intro-js.service';
import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArquivesService } from 'src/app/services/archives/archives.service';
import { Archive } from 'src/app/models/archive';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FilesService } from 'src/app/services/files/files.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { PicturesService } from 'src/app/services/pictures/pictures.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import * as $ from 'jquery';
import * as moment from 'moment';
import { routerTransition } from 'src/app/router.animations';
import { ResquestEnum } from 'src/app/models/email-service';
import _ from 'lodash';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-audit-show',
    templateUrl: './audit-show.component.html',
    styleUrls: ['./audit-show.component.scss'],
    animations: [routerTransition()]

})
export class AuditShowComponent implements OnInit {
    progressModal = {
        customClass: 'modal-style'
    };
    id: string;
    archive: Archive;
    uploadResponse: any = { status: 'progress', message: 0 };
    error: string;
    isArchivesSearch = false;
    loading: Boolean = true;
    first = true;
    requestList: any = [];
    errorUpload: boolean = null;
    file: any = '';
    savedFile = false;
    height = 0;
    archiveCreateForm: FormGroup;
    requestForm: FormGroup;
    permissionEdit = false;
    permissionDelete = false;
    isUsers = false;
    pending: Boolean;
    startCurrentDate = false;
    inputStartCurrentDate = '';
    @ViewChild('content') content: TemplateRef<any>;

    uploadFile = new FormGroup({
        storehouse: new FormControl(''),
        volume: new FormControl(''),
        company: new FormControl(''),
        archive: new FormControl(''),
        doct: new FormControl(''),
        file: new FormControl(null, [Validators.required])
    });

    constructor(
        private _route: Router,
        private route: ActivatedRoute,
        private archiveSrv: ArquivesService,
        private picturesSrv: PicturesService,
        private filesSrv: FilesService,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
        private introService: IntroJsService,

    ) { }

    ngOnInit() {
        this.isArchivesSearch = this.isArchiveSearch();
        this.archiveCreateForm = this.fb.group({
            create: this.fb.control(''),
            indexBy: this.fb.control('')
        });
        this.requestForm = this.fb.group({
            requestType: this.fb.control(''),
            notes: this.fb.control('')
        });
        this.height = $('nav.sidebar').height();
        this.id = this.route.snapshot.paramMap.get('id');
        this.getArquive();
        this.startCurrentDate = JSON.parse(window.localStorage.getItem('routes'))[0].startcurrentdate;

        this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
        this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
        this.isUsers = JSON.parse(localStorage.getItem('userExternal'));
        this.requestList = ResquestEnum;
    }

    //   isUser() {
    //     let res = false;
    //     if (JSON.parse(window.localStorage.getItem('routes'))[0].users) {
    //       res = true;
    //     }
    //     return res;
    //   }

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
            this.getArquive();
            this.loading = false;
        }, error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR ', error);
        });
    }


    getArquive() {
        this.loading = true;
        this.archiveSrv.archive(this.id).subscribe(data => {
            this.archive = data;
            this.pending = data.pending;
            this.archiveCreateForm.patchValue({
                create: moment(data.create).format('DD/MM/YYYY hh:mm'),
                indexBy: data.author && data.author.email ? data.author.email : 'Sem e-mail'
            });
            this.file = data.picture;
            $('.file').css('height', 'auto');
            this.loading = false;
        }, error => {
            $('.file').css('height', this.height - 30);
            console.log('ERROR: ', error);
            this.loading = false;
        });
    }

    picture(archive_id) {
        this.picturesSrv.picture(archive_id).subscribe(data => {
            this.file = data;
            $('.file').css('height', 'auto');
        }, (error) => {
            $('.file').css('height', this.height - 30);
        });
    }

    mapLabel(labels, tags) {
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

    postFile(data) {
        this.uploadFile.patchValue({
            archive: this.archive._id,
            volume: this.archive.volume._id,
            company: this.archive.company._id,
            storehouse: this.archive.storehouse._id,
            doct: this.archive.doct._id,
            file: data
        });
        this.submit();
    }

    submit() {
        // this.loading = true;
        const formData = new FormData();
        formData.append('files', this.uploadFile.get('file').value);
        formData.append('storehouse', this.uploadFile.get('storehouse').value);
        formData.append('volume', this.uploadFile.get('volume').value);
        formData.append('archive', this.uploadFile.get('archive').value);
        formData.append('doct', this.uploadFile.get('doct').value);
        formData.append('company', this.uploadFile.get('company').value);
        this.filesSrv.fileS(formData).subscribe(data => {
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
            console.log('ERROR ', error);
        });
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

    openBackDropCustomClass(content) {
        this.modalService.open(content, { centered: true, keyboard: true, backdrop: 'static', backdropClass: 'light-blue-backdrop', windowClass: 'modal-style' });
    }

    delete(file) {
        this.archiveSrv.delete(this.id, this.archive).subscribe(res => {
            this.successMsgSrv.successMessages('Arquivo deletado com sucesso.');
            this.file = null;
            this.archive = null;
            this._route.navigate(['/archives']);
        }, error => {
            console.log(error);
            this.errorMsg.errorMessages(error);
        });
    }

    editArchive(archive) {
        this._route.navigate(['/archives/edit', archive]);
    }

    sendRequest() {
        this.loading = true;
        this.archiveSrv.sendRequest(this.id, this.requestForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Solicitação cadastrado com sucesso.');
                this.ngOnInit();

            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    FimRequest() {
        this.loading = true;
        this.archiveSrv.finalRequest(this.id).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Solicitação Finalizada com sucesso.');
                this.ngOnInit();
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    help() {
        this.introService.ShowArchives();
    }

    isArchiveSearch() {
        let res = false;
        if (JSON.parse(window.localStorage.getItem('routes'))[0].archivesSearch) {
            res = true;
        }
        return res;
    }
}


