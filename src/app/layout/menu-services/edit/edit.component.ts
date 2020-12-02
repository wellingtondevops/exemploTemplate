import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Menu } from 'src/app/models/menu';
import { routerTransition } from 'src/app/router.animations';
import { MenuService } from 'src/app/services/menu-services/menu-services.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Masks } from 'src/app/utils/masks';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  animations: [routerTransition()]
})
export class EditComponent implements OnInit {
  loading = false;
  serviceForm: FormGroup;
  service: Menu;
  permissionEdit = false;
  permissionDelete = false;
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
      descriptionService: this.fb.control({ value: '' })
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
    this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

    this.getMenuService();
  }

  get descriptionService() {
    return this.serviceForm.get('descriptionService');
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
        _id: data._id,
        descriptionService: data.descriptionService
      });
    }, error => {
      console.log('ERROR:', error);
    });
  }

  editMenu(service) {
    this._route.navigate(['/menu-services/edit', service]);
  }

  updateMenu() {
    this.loading = true;
    this.menuSrv.updateService(this.serviceForm.value).subscribe(data => {
      if (data._id) {
        this.loading = false;
        this.successMsgSrv.successMessages('Menu alterado com sucesso.');
        this._route.navigate(['/menu-services/get', data._id]);
      }
    }, error => {
      this.loading = false;
      this.errorMsg.errorMessages(error);
      console.log('ERROR: ', error);
    });
  }

}
