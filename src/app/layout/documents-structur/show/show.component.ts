import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DocumentStructur } from 'src/app/models/document-structur';
import { routerTransition } from 'src/app/router.animations';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import * as moment from 'moment';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  animations: [routerTransition()]
})
export class ShowComponent implements OnInit {
  loading: Boolean = false;
  documentStructurForm: FormGroup;
  id: String;
  documentStructur: DocumentStructur;
  structurs: any = [];
  classes: any = [];
  subclasses: any = [];
  groups: any = [];
  subgroups: any = [];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private errorMsg: ErrorMessagesService,
    private _route: Router,
    private successMsgSrv: SuccessMessagesService,
    private modalService: NgbModal,
    private documentStructurSrv: DocumentsStructurService,
    public modal: NgbActiveModal,
  ) { }

  ngOnInit() {

    this.documentStructurForm = this.fb.group({
      _id: '',
      structureName: this.fb.control(''),
      classes: this.fb.array([]),
      dateCreated: this.fb.control('')
    })

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocumentStructur(this.id);
  }

  getDocumentStructur(id) {
    this.documentStructurSrv.documentStructur(id).subscribe(data => {
      console.log(data)
      if (data._id) {
        this.documentStructurForm.patchValue({
          _id: data._id,
          structureName: data.structureName,
          classes: data.classes,
          dateCreated: moment(data.dateCreated).format('YYYY-MM-DD'),
        });

        console.log(data.classes)

        let classes = data.classes;
        classes.map(classe => {
          this.addClass(classe)
          if(classe.subclasses.length > 0){
            classe.subclasses.map(subclass => {
              console.log(subclass)
              this.addSubClass(subclass);
            })
          }
        })
      }
    })
  }

  createClass(item): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control({ value: item.codTopic, disabled: true }),
      topic: this.fb.control({ value: item.topic, disabled: true }),
      currentLabel: this.fb.control({ value: item.currentLabel, disabled: true }),
      currentValue: this.fb.control({ value: item.currentValue, disabled: true }),
      intermediateLabel: this.fb.control({ value: item.intermediateLabel, disabled: true }),
      intermediateValue: this.fb.control({ value: item.intermediateValue, disabled: true }),
      final: this.fb.control({ value: item.final, disabled: true }),
      comments: this.fb.control({ value: item.comments, disabled: true }),
      subclasses: this.fb.array(item.subclasses)
    });
  }

  createSubClass(): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control({ value: '', disabled: true }),
      topic: this.fb.control({ value: '', disabled: true }),
      currentLabel: this.fb.control({ value: '', disabled: true }),
      currentValue: this.fb.control({ value: 0, disabled: true }),
      intermediateLabel: this.fb.control({ value: '', disabled: true }),
      intermediateValue: this.fb.control({ value: 0, disabled: true }),
      final: this.fb.control({ value: '', disabled: true }),
      comments: this.fb.control({ value: '', disabled: true }),
      groups: this.fb.array([])
    });
  }

  createGroup(): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control({ value: '', disabled: true }),
      topic: this.fb.control({ value: '', disabled: true }),
      currentLabel: this.fb.control({ value: '', disabled: true }),
      currentValue: this.fb.control({ value: 0, disabled: true }),
      intermediateLabel: this.fb.control({ value: '', disabled: true }),
      intermediateValue: this.fb.control({ value: 0, disabled: true }),
      final: this.fb.control({ value: '', disabled: true }),
      comments: this.fb.control({ value: '', disabled: true }),
      subgroups: this.fb.array([])
    });
  }

  createSubGroup(subclass): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control({ value: subclass.codTopic, disabled: true }),
      topic: this.fb.control({ value: subclass.topic, disabled: true }),
      currentLabel: this.fb.control({ value: subclass.currentLabel, disabled: true }),
      currentValue: this.fb.control({ value: subclass.currentValue, disabled: true }),
      intermediateLabel: this.fb.control({ value: subclass.intermediateLabel, disabled: true }),
      intermediateValue: this.fb.control({ value: subclass.intermediateValue, disabled: true }),
      final: this.fb.control({ value: subclass.final, disabled: true }),
      comments: this.fb.control({ value: subclass.comments, disabled: true }),
    });
  }

  addClass(item): void {
    this.classes = this.documentStructurForm.get('classes') as FormArray;
    this.classes.push(this.createClass(item));
  }

  removeClass(e) {
    this.classes.removeAt(e);
  }

  removeSubClass(classe, e) {
    var subclasses = <FormArray>classe.controls['subclasses'];
    subclasses.removeAt(e)
  }

  addSubClass(classe): void {
    let classeN = classe.get('subclasses') as FormArray;
    classeN.push(this.createSubClass());
  }

  removeGroup(subclass, e) {
    var groups = <FormArray>subclass.controls['groups'];
    groups.removeAt(e)
  }

  addGroup(e): void {
    this.groups = e.get('groups') as FormArray;
    this.groups.push(this.createGroup());
  }

  removeSubGroup(group, e) {
    var subgroups = <FormArray>group.controls['subgroups'];
    subgroups.removeAt(e)
  }

  addSubGroup(e): void {
    this.subgroups = e.get('subgroups') as FormArray;
    this.subgroups.push(this.createSubGroup());
  }

}
