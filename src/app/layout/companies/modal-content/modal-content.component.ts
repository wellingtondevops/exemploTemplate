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

  loading: Boolean = false;
  company: Company;
  companyForm: FormGroup;
  isNew: Boolean = false;
  personTypeList: any = [];

  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirmEdit: boolean = false;
  permissionCancelEdit: boolean = false;
  hiddenCPF: Boolean = true;
  hiddenCNPJ: Boolean = true;
  
  constructor(
    private companiesSrv: CompaniesService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    public mask: Masks,
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
  }

  // INICIALIZAÇÃO

  ngOnInit() {
    if (this.comp) {
      console.log('O COELHINHO TROUXE: ', this.comp);
      this.id = this.comp._id;
      this.getCompany();
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
    } else {
      this.isNew = true;
      this.permissionCancelEdit = true;
      this.permissionConfirmEdit = true;
      
      this.enableDisable(1);
     
    } 
  }

  // RESOURCES

  enableDisable(type) {
    if (type == 1) {
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
            console.log('A COMPANHIA: ', data)
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
            console.log('ERROR', error);
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
    console.log("ESTOU NO EDIT");
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
            console.log('ERROR:', error);
        }
    );
  }

  // FINALIZAÇÃO

  submit(execution: string){
    if (!this.isNew) {
      this.loading = true;
      const company = _.omitBy(this.companyForm.value, _.isNil);
      console.log(company);
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
              console.log('ERROR: ', error);
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
                console.log('ERROR: ', error);
            }
        );
    }
  }

}
