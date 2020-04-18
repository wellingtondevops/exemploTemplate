import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { DocumentStructur } from 'src/app/models/document-structur';
import * as moment from 'moment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  id: String;
  loading: Boolean = false;
  documentStructurForm: FormGroup;
  structurs: any = [];
  classes: any = [];
  subclasses: any = [];
  groups: any = [];
  subgroups: any = [];
  documentStructur: DocumentStructur;

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private fb: FormBuilder,
    private documentStructurSrv: DocumentsStructurService,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
  ) {
  }

  ngOnInit() {
    this.documentStructurForm = this.fb.group({
      structureName: this.fb.control('', Validators.required),
      classes: this.fb.array(this.classes)
    });
    // this.addClass();

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocumentStructur(this.id);
  }

  getDocumentStructur(id) {
    this.documentStructurSrv.documentStructur(id).subscribe(data => {
      console.log(data)
      if (data._id) {
        this.documentStructur = data;
        this.documentStructurForm.patchValue({
          _id: data._id,
          structureName: data.structureName,
          classes: data.classes,
          dateCreated: moment(data.dateCreated).format('YYYY-MM-DD'),
        });
        let classes = data.classes;
        classes.map((classe, i) => {
          this.addClassExist(classe)
          classe.subclasses.map((subclasse, s) => {
            this.addSubClassExist(i, subclasse);
            subclasse.groups.map((group, g) => {
              this.addGroupExist(i, s, group);
              group.subgroups.map((subgroup, sg) => {
                this.addSubGroupExist(i, s, g, subgroup)
              })
            })
          })
        })
      }
    })
  }

  get structureName() {
    return this.documentStructurForm.get('structureName');
  }

  createClass(item = null): FormGroup {
    if(item){
      return this.fb.group({
        codTopic: this.fb.control(item.codTopic ? item.codTopic : '', Validators.required),
        topic: this.fb.control(item.topic ? item.topic : '', Validators.required),
        currentLabel: item.currentLabel ? item.currentLabel : '',
        currentValue: item.currentValue ? item.currentValue : '',
        intermediateLabel: item.intermediateLabel ? item.intermediateLabel : '',
        intermediateValue: item.intermediateValue ? item.intermediateValue : '',
        final: item.final ? item.final : '',
        comments: item.comments ? item.comments : '',
        subclasses: this.fb.array([])
      });
    }

    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: '',
      intermediateLabel: '',
      intermediateValue: '',
      final: '',
      comments: '',
      subclasses: this.fb.array([])
    });
    
  }

  createSubClass(item = null): FormGroup {
    if(item) {
      return this.fb.group({
        codTopic: this.fb.control(item.codTopic ? item.codTopic : '', Validators.required),
        topic: this.fb.control(item.topic ? item.topic : '', Validators.required),
        currentLabel: item.currentLabel ? item.currentLabel : '',
        currentValue: item.currentValue ? item.currentValue : '',
        intermediateLabel: item.intermediateLabel ? item.intermediateLabel : '',
        intermediateValue: item.intermediateValue ? item.intermediateValue : '',
        final: item.final ? item.final : '',
        comments: item.comments ? item.comments : '',
        groups: this.fb.array([])
      });
    }
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: '',
      intermediateLabel: '',
      intermediateValue: '',
      final: '',
      comments: '',
      groups: this.fb.array([])
    });
   
  }

  createGroup(item): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control(item.codTopic ? item.codTopic : '', Validators.required),
      topic: this.fb.control(item.topic ? item.topic : '', Validators.required),
      currentLabel: item.currentLabel ? item.currentLabel : '',
      currentValue: item.currentValue ? item.currentValue : '',
      intermediateLabel: item.intermediateLabel ? item.intermediateLabel : '',
      intermediateValue: item.intermediateValue ? item.intermediateValue : '',
      final: item.final ? item.final : '',
      comments: item.comments ? item.comments : '',
      subgroups: this.fb.array([])
    });
  }

  createSubGroup(item): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control(item.codTopic ? item.codTopic : '', Validators.required),
      topic: this.fb.control(item.topic ? item.topic : '', Validators.required),
      currentLabel: item.currentLabel ? item.currentLabel : '',
      currentValue: item.currentValue ? item.currentValue : '',
      intermediateLabel: item.intermediateLabel ? item.intermediateLabel : '',
      intermediateValue: item.intermediateValue ? item.intermediateValue : '',
      final: item.final ? item.final : '',
      comments: item.comments ? item.comments : '',
    });
  }
  
  addClassExist(item): void {
    this.classes = this.documentStructurForm.get('classes') as FormArray;
    this.classes.push(this.createClass(item));
  }

  addSubClassExist(i, subclass = null): void {
    let classeN = this.classes.controls[i].get('subclasses') as FormArray;
    classeN.push(this.createSubClass(subclass));
  }

  addGroupExist(c, s, group): void {
    let classeN = this.classes.controls[c].get('subclasses').controls[s].get('groups') as FormArray;
    classeN.push(this.createGroup(group));
  }

  addSubGroupExist(c, s, g, subgroup): void {
    let classeN = this.classes.controls[c].get('subclasses').controls[s].get('groups').controls[g].get('subgroups') as FormArray;
    classeN.push(this.createGroup(subgroup));
  }

  addClass(classe = null): void {
    this.classes = this.documentStructurForm.get('classes') as FormArray;
    this.classes.push(this.createClass(null));
  }

  removeClass(e) {
    this.classes.removeAt(e);
  }

  removeSubClass(classe, e) {
    var subclasses = <FormArray>classe.controls['subclasses'];
    subclasses.removeAt(e)
  }

  addSubClass(classe): void {
    console.log(classe)
    let classeN = classe.get('subclasses') as FormArray;
    classeN.push(this.createSubClass(null));
  }

  removeGroup(subclass, e) {
    var groups = <FormArray>subclass.controls['groups'];
    groups.removeAt(e)
  }

  addGroup(e): void {
    this.groups = e.get('groups') as FormArray;
    this.groups.push(this.createGroup(null));
  }

  removeSubGroup(group, e) {
    var subgroups = <FormArray>group.controls['subgroups'];
    subgroups.removeAt(e)
  }

  addSubGroup(e): void {
    this.subgroups = e.get('subgroups') as FormArray;
    this.subgroups.push(this.createSubGroup(null));
  }

  postDocumentStructur() {
    this.loading = true;
    console.log(this.documentStructurForm.value)
    this.documentStructurSrv.newDocumentStructur(this.documentStructurForm.value).subscribe(res => {
      if (res._id) {
        this.loading = false;
        this.successMsgSrv.successMessages('Estrutura documental criada com sucesso.');
        this._route.navigate(['/documents-structur']);
      }
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    })
  }

}
