import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsStructurList, DocumentStructur } from 'src/app/models/document-structur';
import { routerTransition } from 'src/app/router.animations';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  animations: [routerTransition()]
})
export class NewComponent implements OnInit {
  loading: Boolean = false;
  documentStructurForm: FormGroup;
  structurs: any = [];
  classes: any = [];
  subclasses: any = [];
  groups: any = [];
  subgroups: any = [];

  constructor(
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
    this.addClass();
  }

  get structureName() {
    return this.documentStructurForm.get('structureName');
  }

  createClass(): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: 0,
      intermediateLabel: '',
      intermediateValue: 0,
      final: '',
      comments: '',
      subclasses: this.fb.array(this.subclasses)
    });
  }

  createSubClass(): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: 0,
      intermediateLabel: '',
      intermediateValue: 0,
      final: '',
      comments: '',
      groups: this.fb.array([])
    });
  }

  createGroup(): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: 0,
      intermediateLabel: '',
      intermediateValue: 0,
      final: '',
      comments: '',
      subgroups: this.fb.array([])
    });
  }

  createSubGroup(): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: 0,
      intermediateLabel: '',
      intermediateValue: 0,
      final: '',
      comments: ''
    });
  }

  addClass(): void {
    this.classes = this.documentStructurForm.get('classes') as FormArray;
    console.log(this.classes);
    this.classes.push(this.createClass());
  }

  removeClass(e) {
    this.classes.removeAt(e);
  }

  removeSubClass(classe, e) {
    const subclasses = <FormArray>classe.controls['subclasses'];
    subclasses.removeAt(e);
  }

  addSubClass(classe): void {
    console.log(classe);
    const classeN = classe.get('subclasses') as FormArray;
    classeN.push(this.createSubClass());
  }

  removeGroup(subclass, e) {
    const groups = <FormArray>subclass.controls['groups'];
    groups.removeAt(e);
  }

  addGroup(e): void {
    this.groups = e.get('groups') as FormArray;
    this.groups.push(this.createGroup());
  }

  removeSubGroup(group, e) {
    const subgroups = <FormArray>group.controls['subgroups'];
    subgroups.removeAt(e);
  }

  addSubGroup(e): void {
    this.subgroups = e.get('subgroups') as FormArray;
    this.subgroups.push(this.createSubGroup());
  }

  postDocumentStructur() {
    this.loading = true;
    console.log(this.documentStructurForm.value);
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
    });
  }

}
