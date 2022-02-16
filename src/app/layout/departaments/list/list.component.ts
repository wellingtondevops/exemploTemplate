import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit, ElementRef } from '@angular/core';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Page } from 'src/app/models/page';
import { DepartamentList } from 'src/app/models/departament';
import { routerTransition } from 'src/app/router.animations';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import _ from 'lodash';
import { Observable } from 'rxjs';
import { CaseInsensitive } from '../../../utils/case-insensitive'

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    searchForm: FormGroup;
    height: any;
    loading: Boolean = true;
    dropdownSettings: any = {};
    ShowFilter = true;
    limitSelection = false;
    selectedItems = [];
    companyName = [];
    departaments: DepartamentList = {
        _links: {
            currentPage: 0,
            foundItems: 0,
            next: '',
            self: '',
            totalPage: 0
        },
        items: []
    };
    page = new Page();
    companies: any = [];
    columns = [
        { name: 'Empresa', prop: 'company.name' },
        { name: 'Departamento', prop: 'name' },
        // { name: 'Criado por', prop: 'author.name' },
        //{ name: 'Criado em', prop: 'dateCreated', pipe: { transform: this.pipes.datePipe } }
    ];
    permissionNew: boolean = false;

    constructor(
        private el: ElementRef,
        private departmentService: DepartamentsService,
        private _route: Router,
        private pipes: Pipes,
        private errorMsg: ErrorMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private successMsgSrv: SuccessMessagesService,
        private fb: FormBuilder,
        private companiesSrv: CompaniesService,
        private utilCase: CaseInsensitive,
        private localStorageSrv: SaveLocal,
    ) { }

    ngOnInit() {
        // this.setPage({ offset: 0 })
        this.searchForm = this.fb.group({
            name: this.fb.control(null),
            company: this.selectedItems
        });
        const document = JSON.parse(this.localStorageSrv.get('document'));
        if (document && document.company) {
            this.searchForm.patchValue({
                company: document.company,
                name: document.name
            });
        }
        this.getDepartaments();
        this.getCompanies();
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write
        this.dropdownSettings = {
            singleSelection: true,
            idField: '_id',
            textField: 'name',
            selectAllText: 'Marcar Todos',
            unSelectAllText: 'Desmarcar Todos',
            itemsShowLimit: 1,
            allowSearchFilter: this.ShowFilter
        };
    }

    get company() {
        return this.searchForm.get('company');
    }

    getDepartament(departament) {
        this._route.navigate(['/departaments/get', departament._id]);
    }

    getCompanies() {
        this.companiesSrv.searchCompanies().subscribe(
            data => {
                this.companies = data.items;
                this.companyName = this.companies.map(item => {
                    return item;
                });
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    getDepartaments() {
        this.setPageDepartaments({ offset: 0 });
    }

    setPageDepartaments(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('document', this.searchForm.value);

        const newForm = {
            company: null,
            name: null,
        };

        this.searchForm.value.company ? newForm.company = this.searchForm.value.company : null;
        this.searchForm.value.name ? newForm.name = this.searchForm.value.name : null;

        const searchValue = _.omitBy(newForm, _.isNil);

        this.departmentService.searchDepartament(searchValue, this.page).subscribe(
            data => {
                this.departaments = data;
                this.page.pageNumber = data._links.currentPage;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
                this.loading = false;
            }, error => {
                console.log('ERROR: ', error);
                this.loading = false;
            });
    }

    returnId(object) {
        this.searchForm.value[object] = _.filter(this.searchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
    }

    //   setPage(pageInfo) {
    //     this.loading = true;
    //     this.page.pageNumber = pageInfo.offset;

    //     this.departmentService.departaments(this.page, null).subscribe(
    //       data => {
    //         console.log(data);
    //         this.departaments = data;
    //         this.page.pageNumber = data._links.currentPage;
    //         this.page.totalElements = data._links.foundItems;
    //         this.page.size = data._links.totalPage;
    //         this.loading = false;
    //       },
    //       error => {
    //         this.errorMsg.errorMessages(error);
    //         console.log('ERROR: ', error);
    //         this.loading = false;
    //       }
    //     );
    //   }

    formatter = (x: { name: string }) => x.name;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                const res = [];
                if (company.length < 2) { []; }
                return _.filter(this.companies, v => this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);

            })
        )
    clear() {
        this.localStorageSrv.clear('document');

        this.searchForm.patchValue({
            company: null,
            name: null
        });
    }

    onItemSelect(item: any) {
        console.log('onItemSelect', item);
    }

    onSelectAll(items: any) {
        console.log('onSelectAll', items);
    }

    toogleShowFilter() {
        this.ShowFilter = !this.ShowFilter;
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
    }

    handleLimitSelection() {
        if (this.limitSelection) {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
        } else {
            this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
        }
    }

}
