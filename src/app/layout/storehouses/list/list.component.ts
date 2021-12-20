import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input, SimpleChanges } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { StorehousesService } from 'src/app/services/storehouses/storehouses.service';
import { Storehouse, StorehousesList } from 'src/app/models/storehouse';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { ToastrService } from 'ngx-toastr';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { NgbdModalConfirmComponent } from '../../../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { DaenerysGuardService } from 'src/app/services/guard/daenerys-guard.service';
import { Page } from 'src/app/models/page';
import _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  searchForm: FormGroup;
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
  loading: Boolean = true;

  columns = [{ name: 'Nome', prop: 'name' },
  { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];
  permissionNew = false;

  constructor(
    private _route: Router,
    private storeHousesSrv: StorehousesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal,
  ) { }

  ngOnInit() {
    // this.setPage({ offset: 0 });
    // this.getStoreHouses();
    this.searchForm = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
    });
   const deposit = JSON.parse(this.localStorageSrv.get('deposit'));
    if (deposit && deposit.name) {
      this.searchForm.patchValue({
        name: deposit.name
      });
    }
    this.getStoreHouses();
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
  }
  get name() {
    return this.searchForm.get('name');
  }

  getStoreHouse(storeHouse) {
    this._route.navigate(['/storehouses/get', storeHouse._id], {skipLocationChange: true});
  }

  toasterClickedHandler() {
    console.log('Toastr clicked');
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Depósito foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Depósito?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao Depósito serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  d(data) {
    console.log(data);
  }

  c(data) {
    console.log(data);
  }

  isDaenerys() {
    return DaenerysGuardService.isDaenerys();
  }

  delete(data) {
    this.loading = true;
    this.storeHousesSrv.deleteStoreHouse(data).subscribe(
      response => {
        this.loading = false;
        this.successMsgSrv.successMessages('Depósito deletado com sucesso.');
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  getStoreHouses() {
    this.setPageStoreHouses({ offset: 0 });
  }

  setPageStoreHouses(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;
    this.localStorageSrv.save('deposit', this.searchForm.value);

    const newForm = {
            name: this.searchForm.value.name ? this.searchForm.value.name : null,
    };

    const searchValue = _.omitBy(newForm, _.isNil);

    this.storeHousesSrv.searchStorehouse(searchValue, this.page).subscribe(data => {
        this.storehouses = data;
      this.page.pageNumber = data._links.currentPage;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  /* getStoreHouses() {
      this.storeHousesSrv.storeHouses(null).subscribe(
          data => {
              this.loading = false;
              this.storehouses = data;
              this.page.pageNumber = data._links.currentPage;
              this.page.totalElements = data._links.foundItems;
              this.page.size = data._links.totalPage;
          },
          error => {
              this.loading = false;
              this.errorMsg.errorMessages(error);
              console.log('ERROR:', error);
          }
      );
  } */

//   setPage(pageInfo) {
//     this.loading = true;
//     this.page.pageNumber = pageInfo.offset;

//     this.storeHousesSrv.storeHouses(this.page).subscribe(
//       data => {
//         this.storehouses = data;
//         this.page.pageNumber = data._links.currentPage - 1;
//         this.page.totalElements = data._links.foundItems;
//         this.page.size = data._links.totalPage;
//         this.loading = false;
//       },
//       error => {
//         this.errorMsg.errorMessages(error);
//         console.log('ERROR: ', error);
//         this.loading = false;
//       }
//     );
//   }
  clear() {
    this.localStorageSrv.clear('deposit');

    this.searchForm.patchValue({
      name: null
    });
  }
}
