import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PackageService } from './../../../services/config-packages/package.service';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Page } from 'src/app/models/page';
import { routerTransition } from '../../../router.animations';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from '../../../utils/pipes/pipes';
import { Router } from '@angular/router';
import { PackageList } from 'src/app/models/packages';
import { NewComponent } from '../new/new.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  searchForm: FormGroup;
  packages: PackageList = {
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
    { name: 'Nome do Pacote', prop: 'labelPackage', width: 600 },
    { name: 'OCR', prop: 'ocr' },
    { name: 'Assinatura Digital', prop: 'signature'},
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
  ];
  loading: Boolean = true;
  permissionNew: boolean = false;
  modalRef: any;
  modalOptions: NgbModalOptions;
  data;
  closeResult: string;


  constructor(
    private _route: Router,
    private packageSvr: PackageService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes,
    private fb: FormBuilder,
    private localStorageSrv: SaveLocal,
    private introService: IntroJsService,
    private modalService: NgbModal,

  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      keyboard: false,
      windowClass: 'customModal',
    };
  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      labelPackage: this.fb.control('', [Validators.required]),
    });
    const namePackage = JSON.parse(this.localStorageSrv.get('labelPackage'));
    if (namePackage && namePackage.labelPackage) {
      this.searchForm.patchValue({
        labelPackage: namePackage.labelPackage
      });
    }
    this.getMenus();
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write
  }

  getMenu(service) {
    this._route.navigate(['/menu-services/get', service._id]);
  }

  get labelPackage() {
    return this.searchForm.get('labelPackage');
  }

  getMenus() {
    this.setPageMenu({ offset: 0 });
  }

  setPageMenu(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo ? pageInfo.offset ? pageInfo.offset : 0 : 0;
    this.localStorageSrv.save('labelPackage', this.searchForm.value);
    if (this.labelPackage.valid) {
      this.packageSvr.searchPackages(this.searchForm.value, this.page).subscribe(
        data => {
          this.packages = data;
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
    } else {
      this.packageSvr.packages(this.page).subscribe(
        data => {
          this.packages = data;
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

  clear() {
    this.localStorageSrv.clear('labelPackage');
    this.searchForm.patchValue({
      labelPackage: null
    });
  }

  help() {
    this.introService.ListMenuServices();
  }

  newPackage(document) {
    if (document.type == 'click') {
      this.modalRef = this.modalService.open(NewComponent, this.modalOptions);

      if (document.row) {
        this.data = document.row;
        document.cellElement.blur();
        this.modalRef.componentInstance.doc = this.data;
      }

      this.modalRef.result.then((result) => {
        if (result != "Sair") {
          this.getMenus();
        };
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.getMenus();
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
}
