import { Component, OnInit, PipeTransform, Pipe, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { TypeFieldListEnum } from 'src/app/models/typeFieldList.enum';
import { routerTransition } from 'src/app/router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import _ from 'lodash';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { DocumentStructur, Topic } from 'src/app/models/document-structur';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  @ViewChild('tab') private tab: NgbTabset;
  loading: Boolean = false;
  documentForm: FormGroup;
  doctStructForm: FormGroup;
  labels: any = [];
  public typeFieldList: any = TypeFieldListEnum;
  companies: any = [];
  doctStructs: any = [];
  structs: any = [];
  tabIndex: Boolean = false;
  topic: Topic;
  topicForm: FormGroup;

  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private documentSrv: DocumentsService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private companiesSrv: CompaniesService,
    private doctStructsSrv: DocumentsStructurService,
    private utilCase: CaseInsensitive
  ) {

  }

  formatter = (x: { name: string }) => x.name;

  formatterDoctStruct = (x: { structureName: string }) => x.structureName;

  get company() {
    return this.documentForm.get('company');
  }

  get name() {
    return this.documentForm.get('name');
  }

  ngOnInit() {
    this.documentForm = this.fb.group({
      company: this.fb.control('', Validators.required),
      name: this.fb.control('', [Validators.required]),
      label: this.fb.array(this.labels),
      dcurrentValue: this.fb.control(0),
      dcurrentLabel: this.fb.control(''),
      dintermediateValue: this.fb.control(0),
      dfinal: this.fb.control(''),
      refStructureId: this.fb.control(''),
      refTemplateId: this.fb.control('')
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

    this.getCompanies();
    this.getDoctStructs();
    this.addLabel();
  }

  returnId(object) {
    this.documentForm.value[object] = _.filter(this.documentForm.value[object], function (value, key) {
      if (key === '_id') { return value; }
    })[0];
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

  removeLabel(e) {
    this.labels.removeAt(e);
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

  searchCompany = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(company => {
        let res;
        if (company.length < 2) { []; } else { res = _.filter(this.companies, v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10); }
        return res;
      })
    )

  postDocument() {
    this.loading = true;


    this.returnId('company');
    this.doctStructForm.value.company = this.documentForm.value.company;
    const documentForm = _.omitBy(this.documentForm.value, _.isNil);
    this.documentSrv.newDocument(documentForm).subscribe(
      data => {
        if (data._id) {
          this.successMsgSrv.successMessages('Documento cadastrado com sucesso.');
          this._route.navigate(['/documents']);
        }
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR: ', error);
      }
    );
  }

  onChangeStruct() {
    this.doctStructForm.value.id_Structure = this.doctStructForm.value.id_Structure._id;
    if (!this.doctStructForm.value.id_Structure ||
      this.doctStructForm.value.id_Structure === '') {
      this.documentForm.patchValue({
        name: ''
      });
      this.structs = [];
      this.documentForm.get('name').enable();
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
        codTopic: ''
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

  postDoctStruct(doctStructData) {
    return new Promise((resolve, reject) => {
      this.documentSrv.postDoctStruct(doctStructData).subscribe(res => {
        if (res._id) {
          return resolve(true);
        }
      }, error => {
        return reject(false);
      });
      return resolve(false);
    });
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
}
@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    const keys = Object.keys(data);
    return keys.slice(keys.length / 2);
  }
}
