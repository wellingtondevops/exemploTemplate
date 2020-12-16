import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Page } from 'src/app/models/page';
import { RequesterList } from 'src/app/models/requester';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { RequestersService } from 'src/app/services/requesters/requesters.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

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
  requesters: RequesterList = {
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
  companies: any = [];

  columns = [{ name: 'Nome', prop: 'name' }, { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }];
  permissionNew: boolean = false;

  constructor(
    private _route: Router,
    private requestersSrv: RequestersService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private companiesSrv: CompaniesService,
    private utilCase: CaseInsensitive
  ) { }

  ngOnInit() {

    this.searchForm = this.fb.group({
      name: this.fb.control(null),
      company: this.fb.control(null, [Validators.required])
    });
    this.getCompanies();
    this.getRequesters();
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write
  }

  getRequesters() {
    this.setPageRequesters({ offset: 0 });
  }
  getRequester(requester){
    this._route.navigate(['/requesters/get', requester._id]);
  }

  setPageRequesters(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo.offset;

    this.requestersSrv.searchRequesters(this.searchForm.value, this.page).subscribe(data => {
      this.page.pageNumber = data._links.currentPage - 1;
      this.page.totalElements = data._links.foundItems;
      this.page.size = data._links.totalPage;
      this.requesters = data;
      this.loading = false;
    }, error => {
      console.log('ERROR: ', error);
      this.loading = false;
    });
  }

  get company() {
    return this.searchForm.get('company');
  }

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
      data => {
        this.companies = data.items;
      },
      error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
        this.loading = false;
      }
    );
  }

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        if (company.length < 1) { []; }
        return _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);

      })
    )

}
