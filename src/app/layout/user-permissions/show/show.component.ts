import { Page } from 'src/app/models/page';
import { ListCompany, CompanyList } from './../../../models/userPermissions';
import { UserPermissionsService } from './../../../services/users-permissions/user-permissions.service';
import { User } from 'src/app/models/user';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { AccessProfiles } from './../../../models/access-profiles';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';

import { NgbModalConfig, NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';
import { Observable } from 'rxjs';
import _ from 'lodash';


const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};
@Component({
    selector: 'app-show',
    templateUrl: './show.component.html',
    styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
    loading: Boolean = false;
    permissionEdit = false;
    user: User;
    permissionDelete = false;
    isViewPermission = false;
    id: string;
    changeUp = false;
    listComp: any;
    companyList = [];
    page = new Page();

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
    ) { }

    ngOnInit() {
        this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
        this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
        this.id = this.route.snapshot.paramMap.get('id');

        this.getCompaniesList();
    }

    getCompaniesList() {
        this.permissionsSrv.companyList(this.id).subscribe(
            data => {
                this.listComp = data.items;
                this.companyList = this.listComp.map(item => {
                    return item._id;
                });
            }
        );
    }


}
