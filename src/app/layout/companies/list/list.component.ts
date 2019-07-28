import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../../services/companies/companies.service';
import { routerTransition } from '../../../router.animations';
import { CompaniesList } from 'src/app/models/company';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Pagination } from 'src/app/models/pagination';
import { Pipes } from '../../../utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  companies: CompaniesList = {
    _links: {
      currentPage: 1,
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
    {name: 'CPF/CNPJ', prop: 'cpfCnpj'},
    {name: 'E-mail', prop: 'email'},
    {name: 'Telefone', prop: 'fone'},
    {name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];

  constructor(
    private _route: Router,
    private companiesSrv: CompaniesService,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal,
    private successMsgSrv: SuccessMessagesService,
    private pipes: Pipes
  ) { }

  ngOnInit() {
    this.companiesList();
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Empresa foi deletada com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar a empresa?',
      msgQuestionDeleteTwo: 'Todas as informações associadas a empresa serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe((item) => {
      this.delete(item);
    });
  }

  delete(company) {
    this.companiesSrv.delete(company).subscribe(
      (response) => {
        this.successMsgSrv.successMessages('Empresa deletada com sucesso.');
        this.companiesList();
      },
      (error) => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  getCompany(company) {
    this._route.navigate(['ShowComponent'], company);
  }

  editCompany(company) {
    this._route.navigate(['/companies/edit', company]);
  }

  companiesList() {
    this.companiesSrv.companies(null).subscribe(
      (data) => {
        this.companies = data;
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

    this.companiesSrv.companies(this.page).subscribe(data => {
      this.page.pageNumber = data._links.currentPage;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.companies = data;
    });
  }
}
