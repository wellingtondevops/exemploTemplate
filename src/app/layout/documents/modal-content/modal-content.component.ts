import { PackageService } from './../../../services/config-packages/package.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
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
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { Topic } from 'src/app/models/document-structur';

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

  @ViewChild('instanceCompany', ) instanceCompany: NgbTypeahead;

  document: Document;
  documentForm: FormGroup;
  doctStructForm: FormGroup;
  topicForm: FormGroup;
  public typeFieldList: any = TypeFieldListEnum;
  topic: Topic;

  loading: Boolean = false;
  isEditing: Boolean = false;
  isNew: Boolean = false;
  isCurrent: Boolean = false;
  permissionEdit = false;
  permissionDelete = false;
  permissionConfirm = false;
  permissionCancel = false;
  isUsers = false;
  tabIndex: Boolean = false;

  labels: any = [];
  companies: any = [];
  structs: any = [];
  doctStructs: any = [];
  focusCompany$ = new Subject<string>();
  clickCompany$ = new Subject<string>();

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
    private packageSvr: PackageService,

  ) {
    this.documentForm = this.fb.group({
      _id: '',
      company: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      dateCreated: this.fb.control(''),
      label: this.fb.array(this.labels),
      dcurrentLabel: this.fb.control(''),
      dcurrentValue: this.fb.control(0),
      dintermediateValue: this.fb.control(0),
      dfinal: this.fb.control(''),
      currentControl: this.fb.control('')
    });

    this.doctStructForm = this.fb.group({
      id_Structure: this.fb.control(''),
      id_child: this.fb.control(''),
      company: this.fb.control('')
    });

    this.topicForm = this.fb.group({
      comments: this.fb.control({ value: '', disabled: true }),
      final: this.fb.control({ value: '', disabled: true }),
      intermediateValue: this.fb.control({ value: 0, disabled: true }),
      intermediateLabel: this.fb.control({ value: '', disabled: true }),
      currentValue: this.fb.control({ value: 0, disabled: true }),
      currentLabel: this.fb.control({ value: '', disabled: true }),
      topic: this.fb.control({ value: '', disabled: true }),
      codTopic: this.fb.control({ value: '', disabled: true }),

    });

   }

  // INICIALIZAÇÃO

  ngOnInit() {
    this.getCompanies();
    if (this.doc) {
      console.log('O COELHINHO TROUXE: ', this.doc);

      this.id = this.doc._id;
      this.getDocument();

      this.enableDisable(0);

      this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
      this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    } else {
      this.isNew = true;
      this.permissionCancel = true;
      this.permissionConfirm = true;
      this.getDoctStructs();

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
                dateCreated: moment(this.document.dateCreated),
                dcurrentLabel: this.document.dcurrentLabel,
                dcurrentValue: this.document.dcurrentValue,
                dintermediateValue: this.document.dintermediateValue,
                dfinal: this.document.dfinal,
                currentControl: this.document.currentControl
            });
            this.document.label.map(item => {
                if (!this.isNew && !this.isEditing) {
                    this.addLabel(item);
                } else {
                    console.log('Teste de Edit');
                    this.addLabelExist(item);
                }
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

  addLabelEdit(): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabelEdit());
}

createLabelEdit(): FormGroup {
    return this.fb.group({
        namefield: '',
        typeField: '',
        uniq: '',
        timeControl: ''
    });
}

  createLabelExist(item): FormGroup {
    console.log('ESTOU NO CREATE = ', item);
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

  createLabel(item): FormGroup {
    return this.fb.group({
        namefield: { value: item.namefield, disabled: true },
        typeField: { value: item.typeField, disabled: true },
        uniq: { value: item.uniq, disabled: true },
        timeControl: { value: item.timeControl, disabled: true }
    });
}

  addLabel(item): void {
    this.labels = this.documentForm.get('label') as FormArray;
    this.labels.push(this.createLabel(item));
  }

  enableDisable(type) {
    if (type === 1) {
      this.documentForm.controls['name'].enable();
      this.documentForm.controls['dcurrentLabel'].enable();
      this.documentForm.controls['dcurrentValue'].enable();
      this.documentForm.controls['dintermediateValue'].enable();
      this.documentForm.controls['dfinal'].enable();
      this.documentForm.controls['currentControl'].enable();
      this.documentForm.controls['label'].enable();

    } else {
      this.documentForm.controls['company'].disable();
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

  onChangeStruct() {
    this.doctStructForm.value.id_Structure = this.doctStructForm.value.id_Structure._id;
    if (!this.doctStructForm.value.id_Structure ||
        this.doctStructForm.value.id_Structure === '') {
        this.documentForm.patchValue({
            name: '',
            currentControl: ''
        });
        this.structs = [];
        this.documentForm.get('name').enable();
        this.documentForm.get('currentControl').enable();
        this.topic = null;
        this.doctStructForm.patchValue({
            id_child: ''
        });
        this.topicForm.patchValue({
            comments: '',
            final: '',
            intermediateValue: 0,
            intermediateLabel: '',
            currentValue: 0,
            currentLabel: '',
            topic: '',
            codTopic: '',

        });
    }
  }

  onChangeTopic() {
    this.doctStructForm.value.id_Structure = this.doctStructForm.value.id_Structure._id;
    this.doctStructsSrv.showTopic(this.doctStructForm.value).subscribe(data => {
        this.topic = data;
        this.topicForm.patchValue({
            comments: data.comments,
            final: data.final,
            intermediateLabel: data.intermediateLabel,
            intermediateValue: data.intermediateValue,
            currentValue: data.currentValue,
            currentLabel: data.currentLabel,
            topic: data.topic,
            codTopic: data.codTopic
        });
        if (this.doctStructForm.value.id_Structure &&
            this.doctStructForm.value.id_Structure !== '' &&
            this.doctStructForm.value.id_child &&
            this.doctStructForm.value.id_child !== '') {
            this.documentForm.patchValue({
                name: `${this.topicForm.value.codTopic} ${this.topicForm.value.topic}`,
                dcurrentValue: data.currentValue,
                dcurrentLabel: data.currentLabel,
                dintermediateValue: data.intermediateValue,
                dfinal: data.final,

            });
        } else {
            this.documentForm.patchValue({
                name: ''
            });
            this.documentForm.get('name').enable();
        }
    }, error => {
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
    });
  }
  returnDateCreate(create) {
    return moment(create).utc().format('DD/MM/YYYY hh:mm');
  }

  // FORMATAÇÃO

  formatter = (x: { name: string }) => x.name;

  formatterDoctStruct = (x: { structureName: string }) => x.structureName;

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
    console.log('ESTOU NO EDIT');
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
      this.getDocument();
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
        msgConfirmDelete: 'Documento foi deletado com sucesso.',
        msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o documento?',
        msgQuestionDeleteTwo: 'Todas as informações associadas ao documento serão deletadas.'
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
            this.successMsgSrv.successMessages('Documento deletado com sucesso.');
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

  submit() {
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
    } else {
        this.loading = true;


        this.returnId('company');
        this.doctStructForm.value.company = this.documentForm.value.company;
        const documentForm = _.omitBy(this.documentForm.value, _.isNil);
        this.documentSrv.newDocument(documentForm).subscribe(
            data => {
                if (data._id) {
                    this.successMsgSrv.successMessages('Documento cadastrado com sucesso.');
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

  addDoc(endpoint) {
    this.loading = true;
    const id = this.document._id;
    let a: any;
    this.packageSvr.addDocument(id, endpoint, a).subscribe(
      data => {
        this.successMsgSrv.successMessages(data.message);
        this.getDocument();
        this.loading = false;
      },
      error => {
        this.errorMsg.errorMessages(error);
        this.loading = false;
      }
    )
  }

}
