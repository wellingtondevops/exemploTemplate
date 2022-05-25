import { SaveLocal } from './../../../storage/saveLocal';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DepartamentsService } from 'src/app/services/departaments/departaments.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Router } from '@angular/router';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { NgbModal, NgbActiveModal, NgbTypeahead, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Page } from 'src/app/models/page';
import { DepartamentList } from 'src/app/models/departament';
import { routerTransition } from 'src/app/router.animations';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import _ from 'lodash';
import { Observable, Subject, merge } from 'rxjs';
import { CaseInsensitive } from '../../../utils/case-insensitive'
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';

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
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;

    data;
    modalRef: any;
    closeResult: string;
    modalOptions:NgbModalOptions;
    searchForm: FormGroup;
    height: any;
    loading: Boolean = true;
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
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
        { name: 'Empresa', prop: 'company.name', width: 825 },
        { name: 'Departamento', prop: 'name', width: 825 },
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
        private introService: IntroJsService,
    ) {

        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop',
            keyboard: false,
            windowClass: 'customModal',
        };

    }

    ngOnInit() {
        // this.setPage({ offset: 0 })
        this.searchForm = this.fb.group({
            name: this.fb.control(null),
            company: this.fb.control(null, Validators.required)
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
    }

    get company() {
        return this.searchForm.get('company');
    }

    getDepartament(value) {
    if (value.type === 'click') {
        console.log("CLIQUEI, TROUXE: ", value);
        this.data = value.row;
        value.cellElement.blur(); // Correção do erro de "ExpressionChangedAfterItHasBeenCheckedError"

        console.log("DATA DA LISTA: ", this.data._id);

        this.modalRef = this.modalService.open(ModalContentComponent, this.modalOptions);
        this.modalRef.componentInstance.dep = this.data;
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
    }



    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a bac~kdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

    getCompanies() {
        this.companiesSrv.searchCompanies().subscribe(
            data => {
                this.companies = data.items;
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
                console.log("AQUI A DATA? ", data);
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

    searchCompany = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
        const clicksWithClosedPopup$ = this.clickCompany$.pipe(filter(() => !this.instanceCompany.isPopupOpen()));
        const inputFocus$ = this.focusCompany$;

        return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
            map(company => {
                let res = [];
                if (company.length < 0) {
                    [];
                } else {
                    res = _.filter(this.companies,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        );
    }

    //   searchCompany = (text$: Observable<string>) =>
    //     text$.pipe(
    //       debounceTime(200),
    //       distinctUntilChanged(),
    //       map(company => {
    //         const res = [];
    //         if (company.length < 2) { []; }
    //         return _.filter(this.companies, v => this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);

    //       })
    //     )
    clear() {
        this.localStorageSrv.clear('document');

        this.searchForm.patchValue({
            company: null,
            name: null
        });
    }

    help() {
        this.introService.ListDepartment();
    }
}
