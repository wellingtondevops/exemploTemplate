import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsStructurList } from 'src/app/models/document-structur';
import { routerTransition } from 'src/app/router.animations';

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

  constructor(
    private _route: Router,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.documentStructurForm = this.fb.group({
      structureName: this.fb.control('', Validators.required),
      class: this.fb.array(this.classes)
    });
    this.addClass();
    console.log(this.classes)
    console.log(this.documentStructurForm.value);
  }

  get structureName() {
    return this.documentStructurForm.get('structureName');
  }

  createClass(): FormGroup {
    return this.fb.group({
      codTopic: '',
      topic: '',
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
      codTopic: '',
      topic: '',
      currentLabel: '',
      currentValue: 0,
      intermediateLabel: '',
      intermediateValue: 0,
      final: '',
      comments: '',
      group: this.fb.array([])
    });
  }

  createGroup(): FormGroup {
    return this.fb.group({
      codTopic: '',
      topic: '',
      currentLabel: '',
      currentValue: 0,
      intermediateLabel: '',
      intermediateValue: 0,
      final: '',
      comments: '',
      subgroups: this.fb.array([])
    });
  }

  addClass(): void {
    this.classes = this.documentStructurForm.get('class') as FormArray;
    this.classes.push(this.createClass());
  }

  removeClass(e) {
    this.classes.removeAt(e);
  }

  removeSubClass(classe, e){
    var subclasses = <FormArray>classe.controls['subclasses'];
    subclasses.removeAt(e)
  }

  addSubClass(classe): void {
    let classeN = classe.get('subclasses') as FormArray;
    classeN.push(this.createSubClass());
  }

  addGroup(e): void {
    this.groups = e.get('groups') as FormArray;
    this.groups.push(this.createSubClass());
  }

  postDocumentStructur() {
    console.log(this.documentStructurForm.value)
  }

}
