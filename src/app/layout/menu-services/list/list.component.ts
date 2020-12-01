import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Page } from 'src/app/models/page';
import { routerTransition } from '../../../router.animations';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from '../../../utils/pipes/pipes';
import { Router } from '@angular/router';
import { Menu, MenuList } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu-services/menu-services.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  animations: [routerTransition()]
})
export class ListComponent implements OnInit {
  searchForm: FormGroup;
  services: MenuList = {
    _links: {
      currentPage: 1,
      foundItems: 0,
      next: '',
      self: '',
      totalPage: 0
    },
    items: []
  };
  page = new Page();
  columns = [
    { name: 'Descrição', prop: 'descriptionService' },
    { name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
  ];
  loading: Boolean = true;
  permissionNew: boolean = false;

  constructor(
    private _route: Router,
    private menuSrv: MenuService,
    private errorMsg: ErrorMessagesService,
    private pipes: Pipes,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      descriptionService: this.fb.control('', [Validators.required]),
    });
    this.getMenus();
    this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write
  }

  getMenu(service) {
    this._route.navigate(['/menu-services/get', service._id]);
  }

  get descriptionService() {
    return this.searchForm.get('descriptionService');
  }

  getMenus() {
    this.setPageMenu({ offset: 0 });
  }

  setPageMenu(pageInfo) {
    this.loading = true;
    this.page.pageNumber = pageInfo ? pageInfo.offset ? pageInfo.offset : 0 : 0;
    if (this.descriptionService.valid) {
      this.menuSrv.searchServices(this.searchForm.value, this.page).subscribe(
        data => {
          this.services = data;
          this.page.pageNumber = data._links.currentPage - 1;
          this.page.totalElements = data._links.foundItems;
          this.page.size = data._links.totalPage;
          this.loading = false;
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    } else {
      this.menuSrv.services(this.page).subscribe(
        data => {
          this.services = data;
          this.page.pageNumber = data._links.currentPage - 1;
          this.page.totalElements = data._links.foundItems;
          this.page.size = data._links.totalPage;
          this.loading = false;
        },
        error => {
          this.errorMsg.errorMessages(error);
          console.log('ERROR: ', error);
          this.loading = false;
        }
      );
    }
  }
}
