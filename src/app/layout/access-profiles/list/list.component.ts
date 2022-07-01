import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators';
import { AccessProfilesService } from '../../../services/access-profiles/access-profiles.service';
import { Page } from 'src/app/models/page';
import { AccessProfilesList } from './../../../models/access-profiles';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { NgbModal, NgbActiveModal, NgbTypeahead, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Observable, merge, Subject } from 'rxjs';
import _ from 'lodash';
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
    loading: Boolean = false;
    permissionNew: Boolean = true;
    searchForm: FormGroup;
    companies: any = [];
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();
    accessProfiles: AccessProfilesList = {
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
        { name: 'Empresa', prop: 'company.name', width: 830 },
        { name: 'Perfil', prop: 'name', width: 825 },
    ];

    modalOptions: NgbModalOptions;
    data;
    modalRef: any;
    closeResult: string;

    constructor(
        private profilesSrv: AccessProfilesService,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private pipes: Pipes,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private fb: FormBuilder,
        private localStorageSrv: SaveLocal,
        private utilCase: CaseInsensitive,
        private companiesSrv: CompaniesService,
        private introService: IntroJsService

    ) {
        this.modalOptions = {
            backdrop: 'static',
            backdropClass: 'customBackdrop',
            keyboard: false,
            windowClass: 'modalProfile',
        };
     }

    ngOnInit() {
        this.permissionNew = JSON.parse(window.localStorage.getItem('actions'))[0].write;
        this.searchForm = this.fb.group({
            company: this.fb.control(null, Validators.required),
            name: this.fb.control(null)
        });
        const profile = JSON.parse(this.localStorageSrv.get('profile'));
        if (profile && profile.company) {
            this.searchForm.patchValue({
                company: profile.company,
                name: profile.name
            });
        }
        this.getAccessProfiles();
        this.getCompanies();
    }

    get company() {
        return this.searchForm.get('company');
    }

    getAccessProfile(accessProfile) {
        this._route.navigate(['/access-profiles/get', accessProfile._id]);
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

    returnId(object) {
        this.searchForm.value[object] = _.filter(this.searchForm.value[object], function (value, key) {
            if (key === '_id') { return value; }
        })[0];
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

    getAccessProfiles() {
        this.setPageAccessProfiles({ offset: 0 });
    }

    setPageAccessProfiles(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('profile', this.searchForm.value);
        const newForm = {
            company: null,
            name: null,
        };
        this.searchForm.value.company ? newForm.company = this.searchForm.value.company : null;
        this.searchForm.value.name ? newForm.name = this.searchForm.value.name : null;

        const searchValue = _.omitBy(newForm, _.isNil);

        this.profilesSrv.searchAccessProfile(searchValue, this.page).subscribe(
            data => {
                this.accessProfiles = data;
                this.page.pageNumber = data._links.currentPage;
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

    clear() {
        this.localStorageSrv.clear('profile');
        this.searchForm.patchValue({
            company: null,
            name: null
        });
    }

    help(): void {
        this.introService.ListAccess();
    }

    openShowModal(value, execution){
        if (execution == 'Antigo') {
            this._route.navigate(['/access-profiles/get', value._id]);
        } else {
            this.modalRef = this.modalService.open(ModalContentComponent, this.modalOptions);

            if (value) {
                this.data = value;
                // value.cellElement.blur(); // Correção do erro de "ExpressionChangedAfterItHasBeenCheckedError".
                this.modalRef.componentInstance.profile = this.data;
            }

            this.modalRef.result.then((result) => {
                if (result != "Sair") {
                    this.getAccessProfiles();
                };
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
}
