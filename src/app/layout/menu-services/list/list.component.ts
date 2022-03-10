import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { SaveLocal } from './../../../storage/saveLocal';
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
        { name: 'Descrição', prop: 'descriptionService', width: 827 },
        { name: 'Criado em', prop: 'dateCreated', width: 827, pipe: { transform: this.pipes.datePipe } }
    ];
    loading: Boolean = true;
    permissionNew: boolean = false;

    constructor(
        private _route: Router,
        private menuSrv: MenuService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
        private introService: IntroJsService,

    ) { }

    ngOnInit() {
        this.searchForm = this.fb.group({
            descriptionService: this.fb.control('', [Validators.required]),
        });
        const description = JSON.parse(this.localStorageSrv.get('description'));
        if (description && description.descriptionService) {
            this.searchForm.patchValue({
                descriptionService: description.descriptionService
            });
        }
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
        this.localStorageSrv.save('description', this.searchForm.value);
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
    clear() {
        this.localStorageSrv.clear('description');

        this.searchForm.patchValue({
            descriptionService: null
        });
    }

    help() {
        this.introService.ListMenuServices();
    }
}
