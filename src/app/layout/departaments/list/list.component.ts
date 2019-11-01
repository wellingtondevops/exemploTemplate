import { Component, OnInit, ElementRef } from '@angular/core';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Page } from 'src/app/models/page';
import { DepartamentList } from 'src/app/models/departament';
import { routerTransition } from 'src/app/router.animations';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

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
  departaments: DepartamentList;
  page = new Page();
  columns = [
    { name: 'Nome', prop: 'name', width: 250 },
    { name: 'Criado por', prop: 'author' },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
  ];

  constructor(
      private el: ElementRef,
      private departmentService: DepartamentsService,
      private _route: Router,
      private pipes: Pipes,
      private errorMsg: ErrorMessagesService,
      private modalService: NgbModal,
      public modal: NgbActiveModal,
      private successMsgSrv: SuccessMessagesService
  ) {}

  ngOnInit() {
      this.setPage({ offset: 0 })
  }

  getDepartament(departament) {
      this._route.navigate(['/departments/get', departament._id]);
  }

  setPage(pageInfo) {
      this.loading = true;
      this.page.pageNumber = pageInfo.offset;

      this.departmentService.departaments(this.page, null).subscribe(
          data => {
              this.departaments = data;
              this.page.pageNumber = data._links.currentPage - 1;
              this.page.totalElements = data._links.foundItems;
              this.page.size = data._links.totalPage;
              this.loading = false;
          },
          error => {
              this.errorMsg.errorMessages(error);
              console.log('ERROR: ', error);
              this.loading = false;
          }
      );
  }

}
