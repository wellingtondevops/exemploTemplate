import { CertificateService } from './../../../services/certificate/certificate.service';
import { Certificate } from './../../../models/certificate';
import { PackageList } from 'src/app/models/packages';
import { Page } from 'src/app/models/page';
import { SaveLocal } from './../../../storage/saveLocal';
import { PackageService } from './../../../services/config-packages/package.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Company } from 'src/app/models/company';
import { PersonTypeEnum } from 'src/app/models/persontype.enum';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Masks } from 'src/app/utils/masks';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { ColumnMode } from 'src/app/models/column-mode.types';

const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit {
  @Input() public comp;
  id;
  loading = false;
  isNew = false;
  permissionEdit = false;
  permissionDelete = false;
  permissionConfirmEdit = false;
  permissionCancelEdit = false;
  disabledTab2 = false;
  disabledTab3 = true;
  hiddenCPF = true;
  hiddenCNPJ = true;
  isOwner = false;
  isconfigOcr = false;
  isceritifates = false;
  isbuyPackages = false;
  ocr: boolean;
  signature: boolean;
  company: Company;
  listCertificate: Certificate;


  dataCompanyPackage;
  idPack;
//   filesAvailable;

  pagesAvailable;

  ColumnMode = ColumnMode;
  page = new Page();
  personTypeList: any = [];
  companyForm: FormGroup;
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
  certificate;

  constructor(
    private companiesSrv: CompaniesService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    public mask: Masks,
    private packageSvr: PackageService,
    private localStorageSrv: SaveLocal,
    private certificateSrv: CertificateService,
  ) {
    this.personTypeList = PersonTypeEnum;

    this.companyForm = this.fb.group({
      _id: this.fb.control(''),
      email: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
      name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      adress: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      province: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      city: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      fone: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      answerable: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      typePerson: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      cpf: this.fb.control({ value: '', disabled: true }),
      cnpj: this.fb.control({ value: '', disabled: true }),
    });
    this.searchForm = this.fb.group({
      labelPackage: this.fb.control('', [Validators.required]),
    });
    const namePackage = JSON.parse(this.localStorageSrv.get('labelPackage'));
    if (namePackage && namePackage.labelPackage) {
      this.searchForm.patchValue({
        labelPackage: namePackage.labelPackage
      });
    }
  }

  // INICIALIZAÇÃO
  ngOnInit() {
    if (this.comp) {
      this.id = this.comp._id;
      this.getCompany();
      this.getCertificate();
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
      this.isOwner = this.isOnwers();
      this.isconfigOcr = this.isConfigOcrs();
      this.isceritifates = this.isCerits();
      this.isbuyPackages = this.isBuys();

    } else {
      this.isNew = true;
      this.permissionCancelEdit = true;
      this.permissionConfirmEdit = true;
      this.enableDisable(1);
    }
  }

  // RESOURCES
  enableDisable(type) {
    if (type === 1) {
      this.companyForm.controls['name'].enable();
      this.companyForm.controls['email'].enable();
      this.companyForm.controls['adress'].enable();
      this.companyForm.controls['province'].enable();
      this.companyForm.controls['city'].enable();
      this.companyForm.controls['fone'].enable();
      this.companyForm.controls['answerable'].enable();
      this.companyForm.controls['typePerson'].enable();
      this.companyForm.controls['cpf'].enable();
      this.companyForm.controls['cnpj'].enable();
    } else {
      this.companyForm.controls['name'].disable();
      this.companyForm.controls['email'].disable();
      this.companyForm.controls['adress'].disable();
      this.companyForm.controls['province'].disable();
      this.companyForm.controls['city'].disable();
      this.companyForm.controls['fone'].disable();
      this.companyForm.controls['answerable'].disable();
      this.companyForm.controls['typePerson'].disable();
      this.companyForm.controls['cpf'].disable();
      this.companyForm.controls['cnpj'].disable();

    }
  }

  getCompany() {
    this.companiesSrv.company(this.id).subscribe(
      data => {
        this.loading = false;
        this.company = data;
        this.companyForm.patchValue({
          _id: this.company._id,
          name: this.company.name,
          email: this.company.email,
          adress: data.adress,
          province: data.province,
          city: data.city,
          fone: data.fone,
          typePerson: data.typePerson,
          answerable: data.answerable,
          cnpj: data.cnpj ? data.cnpj : null,
          cpf: data.cpf ? data.cpf : null


        });

        // this.filesAvailable = this.company.filesAvailable;
        this.pagesAvailable = this.company.pagesAvailable;
        this.getBuyPackage(this.company._id);
        this.ocr = this.company.ocr;
        this.signature = this.company.signature;
        this.certificate =  data.certificate;
        if (data.cnpj) {
          this.hiddenCNPJ = false;
        }
        if (data.cpf) {
          this.hiddenCPF = false;
        }
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
      }
    );
  }

  close() {
    this.activeModal.close('Sair');
  }

  get email() {
    return this.companyForm.get('email');
  }
  get name() {
    return this.companyForm.get('name');
  }
  get adress() {
    return this.companyForm.get('adress');
  }
  get province() {
    return this.companyForm.get('province');
  }
  get city() {
    return this.companyForm.get('city');
  }
  get fone() {
    return this.companyForm.get('fone');
  }
  get answerable() {
    return this.companyForm.get('answerable');
  }
  get typePerson() {
    return this.companyForm.get('typePerson');
  }
  get cnpj() {
    return this.companyForm.get('cnpj');
  }
  get cpf() {
    return this.companyForm.get('cpf');
  }
  get labelPackage() {
    return this.searchForm.get('labelPackage');
  }

  help() {
    if (this.isNew) {
      this.introService.NewCompany();
    } else if (!this.isNew && this.permissionCancelEdit) {
      this.introService.EditCompany();
    } else {
      this.introService.ShowCompany();
    }
  }

  typePersonChange() {
    switch (this.companyForm.value.typePerson) {
      case 'JURIDICA':
        this.hiddenCPF = true;
        this.hiddenCNPJ = false;
        this.companyForm.addControl('cnpj', new FormControl('', [Validators.required]));
        this.companyForm.addControl('cpf', new FormControl(null));
        break;
      case 'FISICA':
        this.hiddenCNPJ = true;
        this.hiddenCPF = false;
        this.companyForm.addControl('cpf', new FormControl('', [Validators.required]));
        this.companyForm.addControl('cnpj', new FormControl(null));
        break;
    }
  }

  // EDIT
  editDepartament() {
    this.enableDisable(1);
    this.permissionDelete = false;
    this.permissionEdit = false;
    this.permissionCancelEdit = true;
    this.permissionConfirmEdit = true;
  }

  cancelEditNew() {
    if (this.isNew) {
      this.activeModal.close('Sair');
    } else {
      this.enableDisable(0);
      this.getCompany();
      this.permissionDelete = true;
      this.permissionEdit = true;
      this.permissionCancelEdit = false;
      this.permissionConfirmEdit = false;
    }
  }

  // DELETE
  open(name: string, id) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = id;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Empresa foi deletada com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar a empresa?',
      msgQuestionDeleteTwo: 'Todas as informações associadas a empresa serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(itemId => {
      this.delete(itemId);
    });
  }

  delete(id) {
    this.loading = true;
    this.companiesSrv.delete(id).subscribe(
      response => {
        this.loading = false;
        this.successMsgSrv.successMessages('Empresa deletada com sucesso.');
        this.activeModal.close('Excluir');
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
      }
    );
  }

  // FINALIZAÇÃO
  submit() {
    if (!this.isNew) {
      this.loading = true;
      const company = _.omitBy(this.companyForm.value, _.isNil);
      this.companiesSrv.updateCompany(company).subscribe(
        data => {
          if (data._id) {
            this.loading = false;
            this.successMsgSrv.successMessages('Empresa alterada com sucesso.');
            this.activeModal.close('Editar');
          }
        },
        error => {
          this.loading = false;
          this.errorMsg.errorMessages(error);
        }
      );
    } else {
      this.loading = true;
      const company = _.omitBy(this.companyForm.value, _.isNil);
      this.companiesSrv.newCompany(company).subscribe(
        data => {
          if (data._id) {
            this.loading = false;
            this.successMsgSrv.successMessages('Empresa criada com sucesso.');
            this.activeModal.close('Novo');
          }
        },
        error => {
          this.loading = false;
          this.errorMsg.errorMessages(error);
        }
      );
    }
  }

  getPackage() {
    this.setPagePackages({ offset: 0 });
  }

  setPagePackages(pageInfo) {
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

  buyPackage(dataId) {
    this.loading = true;
    const id = this.company._id;
    const idPackage = {
      typepackage: dataId
    };

    this.packageSvr.buyPackage(id, idPackage).subscribe(
      data => {
        this.successMsgSrv.successMessages('Compra efetuada com sucesso!');
        this.idPack = data;
        this.getCompany();
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      });
  }

  changeTab(tab) {
    setTimeout(() => {
      tab.select('tab3');
    }, 1000);
  }

  getBuyPackage(id) {
    this.loading = true;
    this.packageSvr.getBuyPackage(id).subscribe(
      data => {
        this.dataCompanyPackage = data.items[0];
        const dataSize = data.items;
        if (dataSize <= 0) {
          this.disabledTab2 = true;
          this.disabledTab3 = true;
        } else {
          this.disabledTab2 = false;
          this.disabledTab3 = false;
        }
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    );
  }

  addDoc(endpoint, data?) {
    this.loading = true;
    const id = this.company._id;
    const data2 = {
      'certificate': data
    };
    this.packageSvr.addDocument(id, endpoint, data2).subscribe(
      data => {
        this.successMsgSrv.successMessages(data.message);
        this.getCompany();
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    );
  }
  isOnwers() {
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].owner) {
        res = true;
    }
    return res;
}
isConfigOcrs() {
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].configOcr) {
        res = true;
    }
    return res;
}
isCerits() {
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].ceritifates) {
        res = true;
    }
    return res;
}
isBuys() {
    let res = false;
    if (JSON.parse(window.localStorage.getItem('routes'))[0].buyPackages) {
        res = true;
    }
    return res;
}


  getCertificate() {
    this.certificateSrv.searchCertificadeList().subscribe(
      data => {
        this.listCertificate = data.items;

      }, error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    );
  }

}
