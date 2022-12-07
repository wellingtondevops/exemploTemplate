import { routerTransition } from 'src/app/router.animations';
import { Router } from '@angular/router';
import { CertificateService } from './../../../services/certificate/certificate.service';
import { Page } from './../../../models/page';
import { Certificate, CertificateList } from './../../../models/certificate';
import { ErrorMessagesService } from './../../../utils/error-messages/error-messages.service';
import { SaveLocal } from './../../../storage/saveLocal';
import { IntroJsService } from './../../../services/introJs/intro-js.service';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ModalUploadCertificateComponent } from '../modalUploadCertificate/modalUploadCertificate.component';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
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
    this.getCertificates();
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
        this.certificatesData = data.items;
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

  newCertificate(event) {
    if (event.type == 'click') {
      this.modalRef = this.modalService.open(ModalUploadCertificateComponent, this.modalOptions);

      if (event.row) {
        this.data = event.row;
        event.cellElement.blur();
        this.modalRef.componentInstance.doc = this.data;
      }

      this.modalRef.result.then((result) => {
        if (result != "Sair") {
          this.getCertificates();
        };
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a bac~kdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  openCertificate(value){
    if (value.type === 'click') {
      const certificateID = value.row._id;
      sessionStorage.setItem('certificateId', certificateID)
      this.modalRef = this.modalService.open(ModalContentComponent, this.modalOptions);

      if (value.row) {
          this.data = value.row;
          value.cellElement.blur(); // Correção do erro de "ExpressionChangedAfterItHasBeenCheckedError".    
          this.modalRef.componentInstance.comp = this.data;
      }

      this.modalRef.result.then((result) => {
          console.log('Aqui as ideia: ', result);
          if (result != "Sair") {
              this.getCertificates(); 
          };
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
      
  }
  }


}
