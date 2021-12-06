import { Component, OnInit } from '@angular/core';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { DocumentsStructurService } from 'src/app/services/documents-structur/documents-structur.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { DocumentStructur } from 'src/app/models/document-structur';
import * as moment from 'moment';
import { routerTransition } from 'src/app/router.animations';

declare var $;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
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
  divSubClass = false;
  divGroup = false;
  divSubGroup = false;
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
      _id: this.fb.control(''),
      structureName: this.fb.control('', Validators.required),
      classes: this.fb.array(this.classes),
      dateCreated: this.fb.control('')
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocumentStructur(this.id);

    $(document).ready(function() {
        //Verifica se a Janela está no topo
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.scrollToTop').fadeIn();
            } else {
                $('.scrollToTop').fadeOut();
            }
        });

        //Onde a mágia acontece! rs
        $('.scrollToTop').click(function() {
            $('html, body').animate({scrollTop : 0}, 800);
            return false;
        });
    });

    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('.menuBtns').fadeIn();
            } else {
                $('.menuBtns').fadeOut();
            }
        });
    });
  }

  getDocumentStructur(id) {
    this.documentStructurSrv.documentStructur(id).subscribe(data => {
      if (data._id) {
        this.documentStructur = data;
        this.documentStructurForm.patchValue({
          _id: data._id,
          structureName: data.structureName,
          classes: data.classes,
          dateCreated: moment(data.dateCreated).format('YYYY-MM-DD'),
        });
        const classes = data.classes;
        classes.map((classe, i) => {
          this.addClassExist(classe);
          classe.subclasses.map((subclasse, s) => {
            this.addSubClassExist(i, subclasse);
            subclasse.groups.map((group, g) => {
              this.addGroupExist(i, s, group);
              group.subgroups.map((subgroup, sg) => {
                this.addSubGroupExist(i, s, g, subgroup);
              });
            });
          });
        });
      }
    });
  }

  get structureName() {
    return this.documentStructurForm.get('structureName');
  }

  createClass(item = null): FormGroup {
    if (item) {
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
    if (item) {
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
    if (item) {
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
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: '',
      intermediateLabel: '',
      intermediateValue: '',
      final: '',
      comments: '',
      subgroups: this.fb.array([])
    });

  }

  createSubGroup(item): FormGroup {
    if (item) {
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
    return this.fb.group({
      codTopic: this.fb.control('', Validators.required),
      topic: this.fb.control('', Validators.required),
      currentLabel: '',
      currentValue: '',
      intermediateLabel: '',
      intermediateValue: '',
      final: '',
      comments: '',
    });

  }

  addClassExist(item): void {
    this.classes = this.documentStructurForm.get('classes') as FormArray;
    this.classes.push(this.createClass(item));
  }

  addSubClassExist(i, subclass = null): void {
    const classeN = this.classes.controls[i].get('subclasses') as FormArray;
    classeN.push(this.createSubClass(subclass));
  }

  addGroupExist(c, s, group): void {
    const classeN = this.classes.controls[c].get('subclasses').controls[s].get('groups') as FormArray;
    classeN.push(this.createGroup(group));
  }

  addSubGroupExist(c, s, g, subgroup): void {
    const classeN = this.classes.controls[c].get('subclasses').controls[s].get('groups').controls[g].get('subgroups') as FormArray;
    classeN.push(this.createSubGroup(subgroup));
  }

  addClass(classe = null): void {
    this.classes = this.documentStructurForm.get('classes') as FormArray;
    this.classes.push(this.createClass(null));
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
    classeN.push(this.createSubClass(null));
  }

  removeGroup(subclass, e) {
    const groups = <FormArray>subclass.controls['groups'];
    console.log(groups);
    groups.removeAt(e);
  }

  addGroup(e): void {
    this.groups = e.get('groups') as FormArray;
    this.groups.push(this.createGroup(null));
  }

  removeSubGroup(group, e) {
    const subgroups = <FormArray>group.controls['subgroups'];
    subgroups.removeAt(e);
  }

  addSubGroup(e): void {
    this.subgroups = e.get('subgroups') as FormArray;
    this.subgroups.push(this.createSubGroup(null));
  }

  updateDocumentStructur() {
    this.loading = true;
    console.log(this.documentStructurForm.value);
    this.documentStructurSrv.update(this.documentStructurForm.value).subscribe(res => {
      if (res._id) {
        this.loading = false;
        this.successMsgSrv.successMessages('Estrutura documental atualizada com sucesso.');
        this.toBack();
      }
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
}
toBack()
{
    this._route.navigate([`/${'documents-structur/get'}`, this.id]);
}

}
