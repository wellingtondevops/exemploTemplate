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
    permissionDelete = false;
    listDoc: any;
    listProfile: any;
    listDocFull: any;
    listProfileFull: any;
    documentsList: any = [];
    profileList: any = [];
    documentsListFull = [];
    profileListFull = [];
    dropdownSettings: any = {};
    ShowFilter = true;
    limitSelection = false;
    selectedItems = [];
    selectedProfiles = [];
    usersDoctForm: FormGroup;
    userId: string;
    userName: string;
    itensName: any = [];
    profileNames: any = [];

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
            docts: [this.selectedItems],
            accessprofiles: [this.selectedProfiles]
        });

        this.getListDoc();
        this.getListDocFull();
        this.getCompaniesList();
        this.getListProfileFull();
        this.getListProfile();

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

    get accessprofiles() {
        return this.usersDoctForm.get('accessprofiles');
    }

    returnIdDoct() {
        const newArray = [];
        this.usersDoctForm.value.docts.map((item) => {
            newArray.push(item._id);
        });
        this.usersDoctForm.value.docts = newArray;
        console.log('array', newArray);
    }

    returnIdaccessprofiles() {
        const newArray = [];
        this.usersDoctForm.value.accessprofiles.map((item) => {
            newArray.push(item._id);
        });
        this.usersDoctForm.value.accessprofiles = newArray;
        console.log('arrayaccessprofiles', newArray);
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
                    docts: data.docts,
                    accessprofiles: data.accessprofiles
                };

                this.usersDoctForm.patchValue({
                    _id: this.userPermissions._id,
                    docts: this.userPermissions.docts,
                    accessprofiles: this.userPermissions.accessprofiles
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

    openAddDoc(addDoc) {
        this.modalService.open(addDoc, { size: 'lg', windowClass: 'my-class' });
    }
    openRemoveDoc(removeDoc) {
        this.modalService.open(removeDoc, { size: 'lg', windowClass: 'my-class' });
    }
    openAddProfile(addProfile) {
        this.modalService.open(addProfile, { size: 'lg', windowClass: 'my-class' });
    }
    openRemoveProfile(removeProfile) {
        this.modalService.open(removeProfile, { size: 'lg', windowClass: 'my-class' });
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
                    return item;
                });
                this.itensName = this.listDoc.map(data => {
                    return data.name;
                });
            }
        );
    }

    getListProfileFull() {
        this.permissionsSrv.avaliableProfile(this.id).subscribe(
            data => {
                this.listProfileFull = data;
                this.profileListFull = this.listProfileFull.map(item => {
                    return item;
                });
                console.log('Profiles', this.profileListFull);
            }
        );
    }

    getListProfile() {
        this.permissionsSrv.profilesUser(this.id).subscribe(
            data => {
                this.listProfile = data;
                this.profileList = this.listProfile.map(item => {
                    return item;
                });
                this.profileNames = this.listProfile.map(data => {
                    return data.name;
                });
                console.log('ProfilesList', this.listProfile);
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
        this.loading = true;
        this.returnIdDoct();
        this.permissionsSrv.updateList(this.usersDoctForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Permissão alterada com sucesso.');
                this.ngOnInit();
            }
        );
    }

    updateAccessProfiles() {
        this.loading = true;
        this.returnIdaccessprofiles();
        this.permissionsSrv.updateAccessProfile(this.usersDoctForm.value).subscribe(
            data => {
                this.loading = false;
                this.successMsgSrv.successMessages('Permissão alterada com sucesso.');
                this.ngOnInit();
            }
        );
    }

    remove(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Permissão foi deletado com sucesso.',
            msgQuestionDeleteOne:
                'Você tem certeza que deseja deletar a Permissão?',
            msgQuestionDeleteTwo:
                'Todas as informações associadas a Permissão serão deletadas.',
        };
        modalRef.componentInstance.delete.subscribe((item) => {
            this.delete(item);
        });
    }
    delete(id) {
        this.loading = true;
        this.permissionsSrv.deleteCompanyPermission(this.id).subscribe(
            (response) => {
                this.loading = false;
                this.successMsgSrv.successMessages(
                    'Permissão deletada com sucesso.'
                );
                this._route.navigate(['/users/get', this.userId]);
                // window.history.go(-1);
                // return false;
            },
            (error) => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }

    goBack() {
        this._route.navigate(['/users/get', this.userId]);
    }
}
