import { ShowPemissionsUser } from './../../../models/userPermissions';
import { UserPermissionsService } from './../../../services/users-permissions/user-permissions.service';
import { User } from 'src/app/models/user';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { NgbModalConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import _ from 'lodash';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-users-permissions',
    templateUrl: './users-permissions.component.html',
    styleUrls: ['./users-permissions.component.scss']
})
export class UsersPermissionsComponent implements OnInit {
    loading: Boolean = false;
    user: User;
    id: string;
    listComp: any;
    userPermissions: ShowPemissionsUser;
    companyList = [];
    listDoc: any;
    listDocFull: any;
    documentsList: any = [];
    documentsListFull = [];
    dropdownSettings: any = {};
    ShowFilter = true;
    limitSelection = false;
    selectedItems = [];
    usersDoctForm: FormGroup;
    userId: string;

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private errorMsg: ErrorMessagesService,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private profilesSrv: AccessProfilesService,
        private permissionsSrv: UserPermissionsService,
        config: NgbModalConfig,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.usersDoctForm = this.fb.group({
            _id: '',
            docts: [this.selectedItems]
        });

        this.getListDoc();
        this.getListDocFull();
        this.getCompaniesList();

        this.dropdownSettings = {
            singleSelection: false,
            idField: '_id',
            textField: 'name',
            selectAllText: 'Marcar Todos',
            unSelectAllText: 'Desmarcar Todos',
            itemsShowLimit: 0,
            allowSearchFilter: this.ShowFilter
        };
    }

    get docts() {
        return this.usersDoctForm.get('docts');
    }

    returnIdDoct() {
        const newArray = [];
        this.usersDoctForm.value.docts.map((item) => {
            newArray.push(item._id);
        });
        this.usersDoctForm.value.docts = newArray;
        console.log('array', newArray);
    }

    getCompaniesList() {
        this.permissionsSrv.showPermissionsList(this.id).subscribe(
            data => {
                this.loading = false;
                this.userPermissions = {
                    _links: data._links,
                    _id: data._id,
                    company: data.company,
                    user: data.user,
                    docts: data.docts
                };

                this.usersDoctForm.patchValue({
                    _id: this.userPermissions._id,
                    docts: this.userPermissions.docts
                });
                this.listComp = data.company.name;
                this.userId = data.user;
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    open(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'my-class' });
    }
    open2(conte) {
        this.modalService.open(conte, { size: 'lg', windowClass: 'my-class' });
    }

    getListDocFull() {
        this.permissionsSrv.avaliableDocuments(this.id).subscribe(
            data => {
                this.listDocFull = data;
                this.documentsListFull = this.listDocFull.map(item => {
                    return item;
                });
            }
        );
    }

    getListDoc() {
        this.permissionsSrv.documentsUser(this.id).subscribe(
            data => {
                this.listDoc = data;
                this.documentsList = this.listDoc.map(item => {
                    return item.name;
                });
            }
        );
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

    updateList() {
        console.log('lista full', this.selectedItems);
        this.loading = true;
        this.returnIdDoct();
        this.permissionsSrv.updateList(this.usersDoctForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
                this._route.navigate(['/user/get', this.user._id]);
            }
        );
    }
}
