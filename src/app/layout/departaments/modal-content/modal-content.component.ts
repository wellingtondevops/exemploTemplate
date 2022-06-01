import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Departament } from 'src/app/models/departament';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

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
  @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
  @Input() public dep;
  id;

  loading: Boolean = false;
  isNew: Boolean = false;
  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirmEdit: boolean = false;
  permissionCancelEdit: boolean = false;
  isEditing: boolean = false;
  departaments: any = [];
  departament: Departament;
  departamentForm: FormGroup;
  companies: any = [];

  focusCompany$ = new Subject<string>();
  clickCompany$ = new Subject<string>();


  constructor(
    private introService: IntroJsService,
    private activeModal: NgbActiveModal,
    private departamentsSrv: DepartamentsService,
    private companiesSrv: CompaniesService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private fb: FormBuilder,
    private _route: Router,
    private modalService: NgbModal,
    private utilCase: CaseInsensitive,
  ) {
      this.departamentForm = this.fb.group({
        _id: this.fb.control(''),
        company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
        name: this.fb.control({ value: '', disabled: true }, [Validators.required])
      });
  }

  // INICIALIZAÇÃO

  ngOnInit() {
    console.log("PRIMEIRO TESTE: ", this.dep);

    if (this.dep) {
      this.id = this.dep._id;
      this.setForm();
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
    } else {
      this.isNew = true;
      this.getCompanies();
      this.departamentForm.controls['name'].enable();
      this.departamentForm.controls['company'].enable();
      this.permissionCancelEdit = true;
      this.permissionConfirmEdit = true;
    }     
  }

  // RESOURCES

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

  returnId(object) {
    this.departamentForm.value[object] = _.filter(this.departamentForm.value[object], function (value, key) {
        if (key === '_id') { return value; }
    })[0];
  }

  setForm() {
    this.departamentForm.patchValue({
      _id: this.dep._id,
      company: this.dep.company.name,
      name: this.dep.name
    });
  }

  close() {
    this.activeModal.close('Sair');
  }

  get companyIpt() {
    return this.departamentForm.get('company');
  }
  get name() {
    return this.departamentForm.get('name');
  }


  help() {
    if (this.isNew) {
      this.introService.NewDepartment();
    } else if (!this.isNew && this.isEditing) {
      this.introService.EditDepartment();
    } else {
      this.introService.ShowDepartment();
    }
  }

  // EDIT

  editDepartament() {
    console.log("ESTOU NO EDIT");
    this.departamentForm.controls['name'].enable();
    this.permissionDelete = false;
    this.permissionEdit = false;
    this.permissionCancelEdit = true;
    this.permissionConfirmEdit = true;
    this.isEditing = true;
  }

  cancelEditNew() {
    if (this.isNew) {
      this.activeModal.close('Sair');
    } else {
      this.departamentForm.controls['name'].disable();
      this.setForm();
      this.permissionDelete = true;
      this.permissionEdit = true;
      this.permissionCancelEdit = false;
      this.permissionConfirmEdit = false;
      this.isEditing = false;
    }
  }

  // DELETE

  open(name: string, id) {
    const modalRef = this.modalService.open(MODALS[name], {
        keyboard: false, backdrop: 'static', windowClass: 'modal-style',
    });
    modalRef.componentInstance.item = id;
    modalRef.componentInstance.data = {
        titleModal: 'Deletar Departamento',
        msgConfirmDelete: 'Departamento foi deletado com sucesso.',
        msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o departamento?',
        msgQuestionDeleteTwo: 'Todas as informações associadas ao departamento serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
        this.deleteDepartament(item);
    });
  }

  deleteDepartament(id) {
    this.departamentsSrv.delete(id).subscribe(
      response => {
          this.successMsgSrv.successMessages('Departamento deletado com sucesso.');
          this.activeModal.close('Excluir');
      },
      error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR:', error);
      }
  );
  }
  
  // INSERT

  formatter = (x: { name: string }) => x.name;

  searchCompany = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.clickCompany$.pipe(filter(() => !this.instanceCompany.isPopupOpen()));
    const inputFocus$ = this.focusCompany$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
        map(company => {
            let res = [];
            if (company.length < 0) {
                [];
            } else {
                res = _.filter(this.companies,
                    v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
            }
            return res;
        })
    );
  }

  // FINALIZAÇÃO

  submit(execution: string){
    if (!this.isNew) {
      this.returnId('company');
        this.loading = true;
        const departament = _.omitBy(this.departamentForm.value, _.isNil);
        this.departamentsSrv.update(departament).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Departamento alterado com sucesso.');
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
      this.returnId('company');

      const departament = _.omitBy(this.departamentForm.value, _.isNil);
      this.departamentsSrv.newDepartament(departament).subscribe(
          data => {
              if (data._id) {
                  this.successMsgSrv.successMessages('Departamento cadastrado com sucesso.');
                  this.activeModal.close('Novo');
              }
          },
          error => {
              this.errorMsg.errorMessages(error);
              console.log('ERROR: ', error);
          }
      );
    }
  }
}
