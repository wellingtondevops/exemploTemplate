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
  subgroups: any = [];

  constructor(
    private _route: Router,
    private fb: FormBuilder,
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
      groups: this.fb.array([])
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

  createSubGroup(): FormGroup {
    return this.fb.group({
      codTopic: '',
      topic: '',
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

  removeGroup(subclass, e){
    var groups = <FormArray>subclass.controls['groups'];
    groups.removeAt(e)
  }

  addGroup(e): void {
    this.groups = e.get('groups') as FormArray;
    this.groups.push(this.createGroup());
  }

  removeSubGroup(group, e){
    var subgroups = <FormArray>group.controls['subgroups'];
    subgroups.removeAt(e)
  }

  addSubGroup(e): void {
    this.subgroups = e.get('subgroups') as FormArray;
    this.subgroups.push(this.createSubGroup());
  }

  postDocumentStructur() {
    console.log(this.documentStructurForm.value)
  }

}
