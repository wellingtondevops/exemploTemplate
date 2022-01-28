import { CompaniesService } from 'src/app/services/companies/companies.service';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AccessProfilesService } from '../../../services/access-profiles/access-profiles.service';
import { Page } from 'src/app/models/page';
import { AccessProfilesList } from './../../../models/access-profiles';
import { SaveLocal } from 'src/app/storage/saveLocal';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Pipes } from 'src/app/utils/pipes/pipes';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Observable } from 'rxjs';
import _ from 'lodash';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    animations: [routerTransition()]
})
export class ListComponent implements OnInit {
    loading: Boolean = false;
    permissionNew: Boolean = true;
    searchForm: FormGroup;
    companies: any = [];
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
        { name: 'Empresa', prop: 'company.name' },
        { name: 'Perfil', prop: 'name' },
    ];


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

    ) { }

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
        console.log('qual o id', accessProfile);
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


    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                const res = [];
                if (company.length < 2) { []; }
                return _.filter(this.companies,
                    v => this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
            })
        )

    getAccessProfiles() {
        this.setPageAccessProfiles({ offset: 0 });
    }

    setPageAccessProfiles(pageInfo) {
        this.loading = true;
        this.page.pageNumber = pageInfo.offset;
        this.localStorageSrv.save('profile', this.searchForm.value);
        console.log('dataaaaaaaaaaaaaaaaa', this.localStorageSrv.get('profile'));
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
                console.log('profile data', this.accessProfiles);
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
}
