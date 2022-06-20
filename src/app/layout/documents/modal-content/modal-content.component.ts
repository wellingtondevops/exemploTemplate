import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { routerTransition } from 'src/app/router.animations';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { Document } from 'src/app/models/document';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
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
  @Input() public doc;
  id;

  document: Document;
  documentForm: FormGroup;
  doctStructForm: FormGroup;
  public typeFieldList: any = TypeFieldListEnum;

  loading: Boolean = false;
  isEditing: Boolean = false;
  isNew: Boolean = false;
  isCurrent: Boolean = false;
  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  permissionConfirm: boolean = false;
  permissionCancel: boolean = false;
  isUsers = false;
  tabIndex: Boolean = false;

  labels: any = [];
  companies: any = [];
  structs: any = [];
  doctStructs: any = [];

  constructor(
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private activeModal: NgbActiveModal,
    private introService: IntroJsService,
    private modalService: NgbModal,
    private utilCase: CaseInsensitive,
    private companiesSrv: CompaniesService,
    private documentSrv: DocumentsService,
    private doctStructsSrv: DocumentsStructurService,
  ) {
    this.documentForm = this.fb.group({
      _id: '',
      company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
      dateCreated: this.fb.control({ value: '', disabled: true }),
      label: this.fb.array(this.labels),
      dcurrentLabel: this.fb.control({ value: '', disabled: true }),
      dcurrentValue: this.fb.control({ value: 0, disabled: true }),
      dintermediateValue: this.fb.control({ value: 0, disabled: true }),
      dfinal: this.fb.control({ value: '', disabled: true }),
      currentControl: this.fb.control({ value: '', disabled: true })
    });

    this.doctStructForm = this.fb.group({
      id_Structure: this.fb.control(''),
      id_child: this.fb.control(''),
      company: this.fb.control('')
    });

   }

  // INICIALIZAÇÃO

  ngOnInit() {
    if (this.doc) {
      console.log('O COELHINHO TROUXE: ', this.documentForm.get('label').disable());
      

      this.id = this.doc._id;
      this.getDocument();
      this.getCompanies();
      this.getDoctStructs();
      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
      this.disableInputs();
    } else {
      this.isNew = true;
      this.permissionCancel = true;
      this.permissionConfirm = true;
         
    } 
  }

  // RESOURCES

  close() {
    this.activeModal.close('Sair');
  }

  help() {
    if (this.isNew) {
      this.introService.NewDocuments();
    } else if (!this.isNew && this.permissionCancel) {
      this.introService.EditDocuments();
    } else {
      this.introService.ShowDocuments();
    }
  }

  disableInputs() {
    console.log('DESMAIO E DEPRESSÃO');
    (<FormArray>this.documentForm.get('label'))
      .controls
      .forEach(control => {
        control.disable();
      })
  }

  get company() {
    return this.documentForm.get('company');
  }

  get name() {
    return this.documentForm.get('name');
  }

  returnId(object) {
    this.documentForm.value[object] = _.filter(this.documentForm.value[object], function (value, key) {
        if (key === '_id') { return value; }
    })[0];
  }

  getCompanies() {
    this.companiesSrv.searchCompanies().subscribe(
        data => {
            this.companies = data.items;
        },
        error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        }
    );
  }

  getDocument() {
    this.loading = true;
    this.documentSrv.document(this.id).subscribe(
        data => {
            this.document = data;
            this.documentForm.patchValue({
                _id: this.document._id,
                label: this.document.label ? this.document.label : [],
                name: this.document.name,
                company: this.document.company,
                dateCreated: moment(this.document.dateCreated).format('DD/MM/YYYY'),
                dcurrentLabel: this.document.dcurrentLabel,
                dcurrentValue: this.document.dcurrentValue,
                dintermediateValue: this.document.dintermediateValue,
                dfinal: this.document.dfinal,
                currentControl: this.document.currentControl
            });
            this.document.label.map(item => {
              this.addLabelExist(item);
            });
            this.loading = false;
        },
        error => {
            this.loading = false;
            this.errorMsg.errorMessages(error);
            console.log('ERROR', error);
        }
    );
  }

  addLabelExist(item): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabelExist(item));
  }

  createLabelExist(item): FormGroup {
    return this.fb.group({
        namefield: item.namefield,
        typeField: item.typeField,
        uniq: item.uniq,
        timeControl: item.timeControl

    });
  }

  getDoctStructs() {
    this.doctStructsSrv.list().subscribe(
        data => {
            this.doctStructs = data.items;
        },
        error => {
            this.errorMsg.errorMessages(error);
            console.log('ERROR: ', error);
        }
    );
  }

  createLabel(): FormGroup {
    return this.fb.group({
        namefield: '',
        typeField: '',
        uniq: '',
        timeControl: ''
    });
  }

  addLabel(): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabel());
  }

  enableDisable(type) {
    if (type == 1) {
      this.documentForm.controls['name'].enable();
      this.documentForm.controls['dcurrentLabel'].enable();
      this.documentForm.controls['dcurrentValue'].enable();
      this.documentForm.controls['dintermediateValue'].enable();
      this.documentForm.controls['dfinal'].enable();
      this.documentForm.controls['currentControl'].enable();
      this.documentForm.controls['label'].enable();

    } else {
      this.documentForm.controls['name'].disable();
      this.documentForm.controls['dcurrentLabel'].disable();
      this.documentForm.controls['dcurrentValue'].disable();
      this.documentForm.controls['dintermediateValue'].disable();
      this.documentForm.controls['dfinal'].disable();
      this.documentForm.controls['currentControl'].disable();
      this.documentForm.controls['label'].disable();
    }
    
  }

  selectDoctStruct(doctStruct) {
    this.loading = true;
    this.documentSrv.listStructurs(doctStruct.item._id).subscribe(res => {
        this.loading = false;
        this.structs = res;
    }, error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
    });
}

  // NEW
  // FORMATAÇÃO

  formatter = (x: { name: string }) => x.name;

  formatterDoctStruct = (x: { structureName: string }) => x.structureName;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                let res;
                if (company.length < 2) {
                    [];
                } else {
                    res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
                }
                return res;
            })
        )
  
  searchDoctStruct = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(doctStruct => {
        let res;
        if (doctStruct.length < 2) { []; } else { res = _.filter(this.doctStructs, v => (this.utilCase.replaceSpecialChars(v.structureName).toLowerCase().indexOf(doctStruct.toLowerCase())) > -1).slice(0, 10); }
          return res;
        })
    )

  // EDIT

  editDocument() {
    console.log("ESTOU NO EDIT");
    this.enableDisable(1);
    this.isEditing = true;
    this.permissionDelete = false;
    this.permissionEdit = false;
    this.permissionCancel = true;
    this.permissionConfirm = true;
  }

  cancelEditNew() {
    if (this.isNew) {
     this.close();
    } else {
      this.enableDisable(0);
      // this.getDocument();
      this.isEditing = false;
      this.permissionDelete = true;
      this.permissionEdit = true;
      this.permissionCancel = false;
      this.permissionConfirm = false;
    }
  }


  // DELETE

  removeLabel(e) {
    this.labels.removeAt(e);
  }

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
    this.documentSrv.delete(id).subscribe(
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

  submit(){
    if (this.isEditing && !this.isNew) {
      this.loading = true;

      const document = _.omitBy(this.documentForm.value, _.isNil);
      this.documentSrv.updateDocument(document).subscribe(
        data => {
          if (data._id) {
            this.loading = false;
            this.successMsgSrv.successMessages('Documento alterado com sucesso.');
            this.activeModal.close('Editar');
          }
        },
        error => {
          this.loading = false;
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
        });
    }
    
  }

}
