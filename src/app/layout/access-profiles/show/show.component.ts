import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AccessProfilesService } from './../../../services/access-profiles/access-profiles.service';
import { AccessProfiles } from './../../../models/access-profiles';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
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
    styleUrls: ['./show.component.scss'],
    animations: [routerTransition()]

})
export class ShowComponent implements OnInit {
    loading: Boolean = true;
    permissionEdit = false;
    permissionDelete = false;
    accessProfileForm: FormGroup;
    companies: any = [];
    company: any;
    documentsAll: any = [];
    id: string;
    accessProfile: AccessProfiles;
    docts: any = [];
    changeUp = false;
    public isCollapsed = true;


    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private errorMsg: ErrorMessagesService,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal,
        private profilesSrv: AccessProfilesService,
        private documentsSrv: DocumentsService,
        private companiesSrv: CompaniesService,
        config: NgbModalConfig,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
        this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;

        this.accessProfileForm = this.fb.group({
            _id: '',
            name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            docts: this.fb.array(this.docts),
        });

        this.id = this.route.snapshot.paramMap.get('id');

        // this.getCompanies();
        this.getDocuments();
        this.getAccessProfile();

    }

    get name() {
        return this.accessProfileForm.get('name');
    }

    formatter = (x: { name: string }) => x.name;

    searchCompany = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(company => {
                this.company = this.companies.name;
                console.log('sdfsdf', this.company);
                let res;
                if (company.length < 2) {
                    [];
                } else {
                    res = _.filter(this.companies, v => v.name.toLowerCase().indexOf(company.toLowerCase()) > -1).slice(0, 10);
                }
                return res;
            })
        )

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

    getDocuments(e = null) {
        this.documentsSrv.doctsAccessProfile(this.id).subscribe(
            data => {
                this.documentsAll = data;
                console.log('docAll  ', this.documentsAll);
                if (!this.accessProfile) {
                    this.getAccessProfile();
                }
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
                this.loading = false;
            }
        );
    }

    getAccessProfile() {
        this.profilesSrv.accessProfile(this.id).subscribe(
            data => {
                this.loading = false;
                this.accessProfile = {
                    _links: data._links,
                    _id: data._id,
                    name: data.name,
                    company: data.company,
                    docts: data.docts,
                };
                this.accessProfileForm.patchValue({
                    _id: data._id,
                    name: data.name,
                    company: data.company,
                    docts: this.accessProfile.docts
                });

                this.accessProfile.docts.map(item => {
                    this.addPermissionExist(item);
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    createPermissionExist(item): FormGroup {
        return this.fb.group({
            docts: {value: item.docts, disabled: false}
        });
    }

    addPermissionExist(item): void {
        this.docts = this.accessProfileForm.get('docts') as FormArray;
        this.docts.push(this.createPermissionExist(item));
    }

    // returnDoctsArray(docts) {
    //     return docts.map(item => {
    //         return { docts: [item.docts] };
    //     });
    // }

    // returnDocts(item) {
    //     const docts = [];
    //     docts.push({ _id: item });
    //     return docts;
    // }

    changeUpdate() {
        !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
        if (this.changeUp) {
            this.accessProfileForm.reset({
                _id: this.accessProfile._id,
                name: { value: this.accessProfile.name, disabled: false },
            });
        }
    }

    editAccessProfile(accessProfile) {
        this._route.navigate(['/access-profiles/edit', accessProfile]);
    }

    delete(data) {
        this.loading = true;
        this.profilesSrv.delete(data).subscribe(
            response => {
                this.loading = false;
                this.successMsgSrv.successMessages('Peril deletado com sucesso.');
                this._route.navigate(['/access-profiles']);
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }

    open(name: string, storeHouse) {
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = storeHouse;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Perfil foi deletado com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Peril?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao Perfil serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }
    openMod(content) {
        this.modalService.open(content, { size: 'lg', windowClass: 'my-class', });
    }

}
