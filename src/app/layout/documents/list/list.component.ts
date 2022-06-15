import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { DocumentList } from 'src/app/models/document';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { Page } from 'src/app/models/page';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import _ from 'lodash';
import { SaveLocal } from '../../../storage/saveLocal';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { ModalContentComponent } from '../modal-content/modal-content.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
    searchForm: FormGroup;
    companies: any = [];
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    documents: DocumentList = {
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
    columns = [
        { name: 'Nome', prop: 'name', width: 740 },
        { name: 'Fase Corrente', prop: 'dcurrentValue', width: 200 },
        { name: 'Fase Intermédiaria', prop: 'dintermediateValue', width: 200 },
        { name: 'Destinação Final', prop: 'dfinal', width: 500 },
    ];
    loading: Boolean = false;
    permissionNew = false;

    modalOptions: NgbModalOptions;
    data;
    modalRef: any;
    closeResult: string;

    constructor(
        private _route: Router,
        private documentSrv: DocumentsService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private pipes: Pipes,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
        private utilCase: CaseInsensitive,
        private introService: IntroJsService,
        private modalService: NgbModal,
    ) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop',
            keyboard: false,
            windowClass: 'modalDocument',
        };
     }

    ngOnInit() {
        this.searchForm = this.fb.group({
            name: this.fb.control(null),
            company: this.fb.control(null, [Validators.required]),
        });
        const document = JSON.parse(this.localStorageSrv.get('document'));
        if (document && document.company) {
            this.searchForm.patchValue({
                company: document.company,
                name: document.name
            });
        }
        this.getCompanies();
        this.getDocuments();
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
    }

    get company() {
        return this.searchForm.get('company');
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

    getDocuments() {
        this.setPageDocuments({ offset: 0 });
    }

    returnId(object) {
        this.searchForm.value[object] = _.filter(this.searchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
    }

    setPageDocuments(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('documents', this.searchForm.value);

        const newForm = {
            company: null,
            name: null,
        };

        this.searchForm.value.company ? newForm.company = this.searchForm.value.company : null;
        this.searchForm.value.name ? newForm.name = this.searchForm.value.name : null;

        const searchValue = _.omitBy(newForm, _.isNil);

        this.documentSrv.searchDocts(searchValue, this.page).subscribe(
            data => {
                this.page.pageNumber = data._links.currentPage;
                this.page.totalElements = data._links.foundItems;
                this.page.size = data._links.totalPage;
                this.documents = data;
                this.loading = false;
            }, error => {
                console.log('ERROR: ', error);
                this.loading = false;
            });
    }

    //   setPage(pageInfo) {
    //     this.loading = true;
    //     this.page.pageNumber = pageInfo.offset;

    //     this.documentSrv.documents(this.page).subscribe(
    //       data => {
    //         console.log(data);
    //         this.documents = data;
    //         this.page.pageNumber = data._links.currentPage - 1;
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

    getDocument(document, execution) {
        if (execution == 'Antigo') {
            this._route.navigate(['/documents/get', document._id]);
        } else {
            // if (value.type == 'click') {
                this.modalRef = this.modalService.open(ModalContentComponent, this.modalOptions);
        
                if (document) {
                    this.data = document;
                    // value.cellElement.blur(); // Correção do erro de "ExpressionChangedAfterItHasBeenCheckedError".    
                    this.modalRef.componentInstance.arch = this.data;
                }
    
                this.modalRef.result.then((result) => {
                    if (result != "Sair") {
                        this.getDocuments(); 
                    };
                    this.closeResult = `Closed with: ${result}`;
                  }, (reason) => {
                    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                  });
            // }
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

    clear() {
        this.localStorageSrv.clear('document');

        this.searchForm.patchValue({
            company: null,
            name: null
        });
    }

    help() {
        this.introService.ListDocuments();
    }

}
