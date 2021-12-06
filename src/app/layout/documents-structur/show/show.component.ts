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
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

declare var $;
const MODALS = {
  focusFirst: NgbdModalConfirmComponent
};
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
  divSubClass = false;
  divGroup = false;
  divSubGroup = false;
  showClass = false;
  permissionEdit = false;
  permissionDelete = false;

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
      structureName: this.fb.control({ value: '', disabled: true }),
      classes: this.fb.array([]),
      dateCreated: this.fb.control('')
    });

    this.id = this.route.snapshot.paramMap.get('id');
    this.getDocumentStructur(this.id);
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    $(window).scroll(function() {
        var scroll =  $(window).scrollTop();
        if (scroll >= 40) {               // se rolar 40px ativa o evento
          $('#teste').addClass('ativo');    //coloca a classe "ativo" no id=menu
        } else {
          $('#teste').removeClass('ativo'); //se for menor que 40px retira a classe "ativo" do id=menu
        }
    });

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
      console.log(data);
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
          this.addClass(classe);
          classe.subclasses.map((subclasse, s) => {
            this.addSubClass(i, subclasse);
            subclasse.groups.map((group, g) => {
              this.addGroup(i, s, group);
              group.subgroups.map((subgroup, sg) => {
                this.addSubGroup(i, s, g, subgroup);
              });
            });
          });
        });
      }
    });
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
      subclasses: this.fb.array([])
    });
  }

  createSubClass(item): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control({ value: item.codTopic, disabled: true }),
      topic: this.fb.control({ value: item.topic, disabled: true }),
      currentLabel: this.fb.control({ value: item.currentLabel, disabled: true }),
      currentValue: this.fb.control({ value: item.currentValue, disabled: true }),
      intermediateLabel: this.fb.control({ value: item.intermediateLabel, disabled: true }),
      intermediateValue: this.fb.control({ value: item.intermediateValue, disabled: true }),
      final: this.fb.control({ value: item.final, disabled: true }),
      comments: this.fb.control({ value: item.comments, disabled: true }),
      groups: this.fb.array([])
    });
  }

  createGroup(item): FormGroup {
    return this.fb.group({
      codTopic: this.fb.control({ value: item.codTopic, disabled: true }),
      topic: this.fb.control({ value: item.topic, disabled: true }),
      currentLabel: this.fb.control({ value: item.currentLabel, disabled: true }),
      currentValue: this.fb.control({ value: item.currentValue, disabled: true }),
      intermediateLabel: this.fb.control({ value: item.intermediateLabel, disabled: true }),
      intermediateValue: this.fb.control({ value: item.intermediateValue, disabled: true }),
      final: this.fb.control({ value: item.final, disabled: true }),
      comments: this.fb.control({ value: item.comments, disabled: true }),
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

  addSubClass(i, subclass = null): void {
    const classeN = this.classes.controls[i].get('subclasses') as FormArray;
    classeN.push(this.createSubClass(subclass));
  }

  addGroup(c, s, group): void {
    const classeN = this.classes.controls[c].get('subclasses').controls[s].get('groups') as FormArray;
    classeN.push(this.createGroup(group));
  }

  addSubGroup(c, s, g, subgroup): void {
    const classeN = this.classes.controls[c].get('subclasses').controls[s].get('groups').controls[g].get('subgroups') as FormArray;
    classeN.push(this.createGroup(subgroup));
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Estrutura de Documento foi deletada com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar a estrutura de documento?',
      msgQuestionDeleteTwo: 'Todas as informações associadas a estrutura de documento serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  editDocumentStructur(document) {
    this._route.navigate(['/documents-structur/edit', document]);
  }

  delete(id) {
    this.loading = true;
    this.documentStructurSrv.delete(id).subscribe(
      data => {
        this.loading = false;
        this.successMsgSrv.successMessages('Estrutura de documento deletada com sucesso.');
        this._route.navigate(['/documents-structur']);
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }
}
