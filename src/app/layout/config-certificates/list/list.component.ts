import { routerTransition } from 'src/app/router.animations';
import { Router } from '@angular/router';
import { CertificateService } from './../../../services/certificate/certificate.service';
import { Page } from './../../../models/page';
import { Certificate, CertificateList } from './../../../models/certificate';
import { ErrorMessagesService } from './../../../utils/error-messages/error-messages.service';
import { SaveLocal } from './../../../storage/saveLocal';
import { IntroJsService } from './../../../services/introJs/intro-js.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;

  searchForm: FormGroup;
  modalOptions: NgbModalOptions;
  ColumnMode = ColumnMode;
  page = new Page();

  loading = true;
  permissionNew = false;
  modalRef: any;
  closeResult: string;
  data;
  certificatesData;

  certificates: CertificateList = {
    _links: {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };

  constructor(
    private _route: Router,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    private certificateSrv: CertificateService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      keyboard: false,
      windowClass: 'customModal',
    };
  }

  ngOnInit() {
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
    this.searchForm = this.fb.group({
      labelCertificate: this.fb.control(''),
    });
  }

  getCertificates() {
    this.setPageCertificates({ offset: 0 });
  }

  setPageCertificates(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo ? pageInfo.offset ? pageInfo.offset : 0 : 0;
    this.localStorageSrv.save('labelPackage', this.searchForm.value);
    this.certificateSrv.searchCertificate(this.page).subscribe(
      data => {
        this.certificatesData = data;
        this.page.pageNumber = data._links.currentPage - 1;
        this.page.totalElements = data._links.foundItems;
        this.page.size = data._links.totalPage;
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    );

  }

  clear() {
    this.localStorageSrv.clear('labelPackage');
    this.searchForm.patchValue({
      labelPackage: null
    });
  }

}
