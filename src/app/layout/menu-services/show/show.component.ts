import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/models/menu';
import { routerTransition } from 'src/app/router.animations';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { MenuService } from 'src/app/services/menu-services/menu-services.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Masks } from 'src/app/utils/masks';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

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
  loading: boolean = false;
  serviceForm: FormGroup;
  service: Menu;
  permissionEdit: boolean = false;
  permissionDelete: boolean = false;
  id: string;

  constructor(
    private _route: Router,
    private route: ActivatedRoute,
    public mask: Masks,
    private menuSrv: MenuService,
    private fb: FormBuilder,
    private successMsgSrv: SuccessMessagesService,
    private errorMsg: ErrorMessagesService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.serviceForm = this.fb.group({
      _id: this.fb.control(''),
      descriptionService: this.fb.control({value: '', disabled: true})
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    this.getMenuService();
  }

  getMenuService() {
    this.menuSrv.service(this.id).subscribe(data => {
      this.service = {
        _id: data._id,
        descriptionService: data.descriptionService,
        link: data.link,
        author: data.author,
        mailSignup: data.mailSignup
      };
      this.serviceForm.patchValue({
        descriptionService: data.descriptionService
      })
    }, error => {
      console.log('ERROR:', error);
    })
  }

  delete(data) {
    this.loading = true;
    this.menuSrv.deleteService(data).subscribe(
      response => {
        this.loading = false;
        this.successMsgSrv.successMessages('Menu deletado com sucesso.');
        this._route.navigate(['/menu-services']);
      },
      error => {
        this.loading = false;
        this.errorMsg.errorMessages(error);
        console.log('ERROR:', error);
      }
    );
  }

  open(name: string, storeHouse) {
    const modalRef = this.modalService.open(MODALS[name]);
    modalRef.componentInstance.item = storeHouse;
    modalRef.componentInstance.data = {
      msgConfirmDelete: 'Menu foi deletado com sucesso.',
      msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Menu?',
      msgQuestionDeleteTwo: 'Todas as informações associadas ao menu serão deletadas.'
    };
    modalRef.componentInstance.delete.subscribe(item => {
      this.delete(item);
    });
  }

  editMenu(service) {
    this._route.navigate(['/menu-services/edit', service]);
  }
}
