import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { AccessProfiles } from './../../../models/access-profiles';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { routerTransition } from 'src/app/router.animations';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import _ from 'lodash';
import { NgbModal, ModalDismissReasons, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    providers: [NgbModalConfig, NgbModal],
    styleUrls: ['./edit.component.scss'],
    animations: [routerTransition()]
})
export class EditComponent implements OnInit {
    id: String;
    closeResult = '';
    accessProfile: AccessProfiles;
    accessProfileForm: FormGroup;
    profilesList: any = [];
    loading: Boolean = true;
    companies: any = [];
    documentsList: any = [];
    documentName: any = [];
    documentsListFull = [];
    listDoc: any;
    listDocFull: any;
    dropdownSettings: any = {};
    ShowFilter = true;
    limitSelection = false;
    selectedItems = [];

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal,
        private _route: Router,
        private route: ActivatedRoute,
        private userSrv: UsersService,
        private accessSrv: AccessProfilesService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService,
        private companiesSrv: CompaniesService,
        private utilCase: CaseInsensitive
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.accessProfileForm = this.fb.group({
            _id: '',
            name: this.fb.control(null, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            docts: [this.selectedItems],
        });

        this.dropdownSettings = {
            singleSelection: false,
            idField: '_id',
            textField: 'name',
            selectAllText: 'Marcar Todos',
            unSelectAllText: 'Desmarcar Todos',
            itemsShowLimit: 0,
            allowSearchFilter: this.ShowFilter
        };

        this.id = this.route.snapshot.paramMap.get('id');

        this.getListDoc();
        this.getListDocFull();
        // this.getCompanies();
        this.getUser();

    }

    get name() {
        return this.accessProfileForm.get('name');
    }

    get docts() {
        return this.accessProfileForm.get('docts');
    }

    open(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'my-class' });
    }
    open2(conte) {
        this.modalService.open(conte, { size: 'lg', windowClass: 'my-class' });
    }

    formatter = (x: { name: string }) => x.name;
    getCompanies() {
        this.companiesSrv.searchCompanies().subscribe(
            data => {
                this.companies = data.items;
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                let res;
                if (company.length < 2) {
                    [];
                } else {
                    res = _.filter(this.companies,
                        v => (this.utilCase.replaceSpecialChars(v.name).toLowerCase().indexOf(company.toLowerCase())) > -1).slice(0, 10);
                }
                return res;
            })
        )

    getListDocFull() {
        this.accessSrv.avaliableDocuments(this.id).subscribe(
            data => {
                this.listDocFull = data;
                this.documentsListFull = this.listDocFull.map(item => {
                    return item;
                });
                console.log('lista nova', this.selectedItems);
            }
        );
    }

    getListDoc() {
        this.accessSrv.documentsProfiles(this.id).subscribe(
            data => {
                this.listDoc = data;
                this.documentsList = this.listDoc.map(item => {
                    return item;
                });
                this.documentName = this.listDoc.map(item => {
                    return item.name;
                })
                console.log('ListaAdc', this.documentsList);
            }
        );
    }

    returnIdDoct() {
        const newArray = [];
        this.accessProfileForm.value.docts.map((item) => {
            newArray.push(item._id);
        });
        this.accessProfileForm.value.docts = newArray;
    }

    getUser() {
        this.accessSrv.accessProfile(this.id).subscribe(
            data => {
                this.loading = false;
                this.accessProfile = {
                    _links: data._links,
                    _id: data._id,
                    company: data.company,
                    name: data.name,
                    docts: data.docts
                };

                this.accessProfileForm.patchValue({
                    _id: this.accessProfile._id,
                    name: data.name,
                    company: data.company,
                    docts: this.accessProfile.docts
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    updateUser() {
        this.loading = true;
        this.accessSrv.update(this.accessProfileForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
                this.accessProfile = data;
                this.accessProfileForm.patchValue({
                    _id: this.accessProfile._id,
                    name: data.name,
                });
                this._route.navigate(['/access-profiles/get', this.accessProfile._id]);
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    updateList() {
        this.loading = true;
        this.returnIdDoct();
        this.accessSrv.update(this.accessProfileForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Permissão alterada com sucesso.');
                this.ngOnInit();
            }
        );
    }

    goBack() {
        this._route.navigate(['/access-profiles/get', this.accessProfile._id]);
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
