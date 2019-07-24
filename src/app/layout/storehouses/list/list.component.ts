import { Component, OnInit, Output, EventEmitter, ViewChild, Input, SimpleChanges } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Storehouse, StorehousesList } from 'src/app/models/storehouse';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { ToastrService } from 'ngx-toastr';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { NgbdModalConfirmComponent } from '../../../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
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
  closeResult: string;
  storehouses: StorehousesList = {
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
    {name: 'Nome', prop: 'name'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private _route: Router,
    private storeHousesSrv: StorehousesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public modal: NgbActiveModal
  ) { }

  ngOnInit() {
    // this.setPage({ offset: 0 });
    this.getStoreHouses();
  }

  getStoreHouse(storeHouse) {
    this._route.navigate(['/storehouses/get', storeHouse]);
  }

  editStoreHouse(storeHouse) {
    this._route.navigate(['/storehouses/edit', storeHouse]);
  }

  deleteStoreHouse(storeHouse) {
    this.toastr.success('Hello world!', 'Toastr fun!')
    .onTap
    .pipe()
    .subscribe(() => this.toasterClickedHandler());
  }

  toasterClickedHandler() {
    console.log('Toastr clicked');
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Armazém foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Armazém?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao armazém serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe((item) => {
      this.delete(item);
    });
  }

  d(data) {
    console.log(data);
  }

  c(data) {
    console.log(data);
  }

  delete(data) {
    this.storeHousesSrv.deleteStoreHouse(data).subscribe(
      (response) => {
        this.successMsgSrv.successMessages('Armazém deletado com sucesso.');
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
  }

  getStoreHouses() {
    this.storeHousesSrv.storeHouses(null).subscribe(
      (data) => {
        this.storehouses = data;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;

    this.storeHousesSrv.storeHouses(this.page).subscribe(
      (data) => {
        this.storehouses = data;
        this.page.pageNumber = data._links.currentPage;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }
}
