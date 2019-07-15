import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { VolumesService } from 'src/app/services/volumes/volumes.service';
import { Volume, VolumeList } from 'src/app/models/volume';
import { Router } from '@angular/router';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';

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
  volumes: VolumeList = {
    _links: {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  page = {
    currentPage: 0,
    totalPage: 0
  };
  columns = [
    {name: 'Empresa', prop: 'company.name', width: 250},
    {name: 'Descrição', prop: 'description'},
    {name: 'Ármazem', prop: 'storehouse.name'},
    {name: 'Localização', prop: 'location', width: 70},
    {name: 'Guarda', prop: 'guardType', width: 50, pipe: { transform: this.pipes.guardType }},
    {name: 'Status', prop: 'status', width: 50, pipe: {transform: this.pipes.status }},
    {name: 'Referência', prop: 'reference', width: 70 },
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private volumeSrv: VolumesService,
    private _route: Router,
    private pipes: Pipes,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private successMsgSrv: SuccessMessagesService,
  ) { }

  ngOnInit() {
    this.setPage({offset: 0});
    // this.listVolumes();
  }

  listVolumes() {
    this.volumeSrv.volumes(null).subscribe(
      (data) => {
        this.volumes = data;
        this.page = data._links;
      },
      (error) => { console.log('ERROR: ', error); }
    );
  }

  getVolume(volume) {
    this._route.navigate(['ShowComponent'], volume);
  }

  editVolume(volume) {
    this._route.navigate(['/volumes/edit', volume]);
  }

  delete(volume) {
    this.volumeSrv.deleteVolume(volume).subscribe(
      (response) => {
        this.successMsgSrv.successMessages('Usuário deletado com sucesso.');
        this.listVolumes();
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Volume foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Volume?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao volume serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe((item) => {
      this.delete(item);
    });
  }

  setPage(pageInfo) {
    this.page.currentPage = pageInfo.offset;

    if (pageInfo.offset >= 1) {
      this.page.currentPage = pageInfo.offset + 1;
    }

    this.volumeSrv.volumes(this.page).subscribe(
      (data) => {
        this.volumes = data;
        this.page = data._links;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

}
