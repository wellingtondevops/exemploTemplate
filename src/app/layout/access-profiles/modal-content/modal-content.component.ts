import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalConfig, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { AccessProfiles } from 'src/app/models/access-profiles';
import { routerTransition } from 'src/app/router.animations';
import { AccessProfilesService } from 'src/app/services/access-profiles/access-profiles.service';
import { CompaniesService } from 'src/app/services/companies/companies.service';
import { DocumentsService } from 'src/app/services/documents/documents.service';
import { IntroJsService } from 'src/app/services/introJs/intro-js.service';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages/success-messages.service';
import _ from 'lodash';

const MODALS = {
    focusFirst: NgbdModalConfirmComponent
};

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
  animations: [routerTransition()]
})
export class ModalContentComponent implements OnInit {
    @ViewChild('instanceCompany',) instanceCompany: NgbTypeahead;
    @Input() public profile;
    id;

    accessProfile: AccessProfiles;

    loading: Boolean = false;
    isNew: Boolean = false;
    isEditing: Boolean = false;

    permissionEdit: boolean = false;
    permissionDelete: boolean = false;
    permissionConfirmEdit: boolean = false;
    permissionCancelEdit: boolean = false;

    labelButton = 'Exibir Documentos Permitidos';

    public isCollapsed = true;
    isViewPermission = false;

    documentsAll: any = [];
    permissions: any = [];
    listDoc: any;
    companies: any;
    focusCompany$ = new Subject<string>();
    clickCompany$ = new Subject<string>();

    accessProfileForm: FormGroup;


    constructor(
        private modalService: NgbModal,
        private errorMsg: ErrorMessagesService,
        private successMsgSrv: SuccessMessagesService,
        private profilesSrv: AccessProfilesService,
        private documentsSrv: DocumentsService,
        private companiesSrv: CompaniesService,
        config: NgbModalConfig,
        private introService: IntroJsService,
        private activeModal: NgbActiveModal,
        private fb: FormBuilder,
        private utilCase: CaseInsensitive,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;

        this.accessProfileForm = this.fb.group({
            _id: '',
            name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            company: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            permissions: this.fb.array(this.permissions),
        });
    }


    ngOnInit() {
        this.getCompanies();
        if (this.profile) {
            console.log('O COELHINHO TROUXE: ', this.profile);
            this.id = this.profile._id;
            this.getDocuments();

            this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
            this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
          } else {
            this.isNew = true;
            this.permissionCancelEdit = true;
            this.permissionConfirmEdit = true;

            this.enableDisable(1);

          }
    }

    // GETS

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

                this.isViewPermission = true;

                this.accessProfileForm.patchValue({
                    _id: data._id,
                    name: data.name,
                    company: data.company,
                    permissions: this.accessProfile.docts
                });

                this.accessProfile.docts.map(item => {
                    this.addPermissionExist(item);
                    this.listDoc = this.accessProfile.docts.map(item => {
                        return   item.name ;
                    });
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    get company() {
        return this.accessProfileForm.get('company');
    }

    get name() {
        return this.accessProfileForm.get('name');
    }

    // RESOURCES

    formatter = (x: { name: string }) => x.name;

    help(){}

    close(){
        this.activeModal.close('Sair');
    }

    enableDisable(exec){
        if (exec == 1) {
            this.accessProfileForm.controls['name'].enable();
        } else {
            this.accessProfileForm.controls['name'].disable();
            this.accessProfileForm.controls['company'].disable();
        }
    }

    addPermissionExist(item): void {
        this.permissions = this.accessProfileForm.get('permissions') as FormArray;
        this.permissions.push(this.createPermissionExist(item));
    }

    createPermissionExist(item): FormGroup {
        return this.fb.group({
            docts: { value: item.docts, disabled: true }
        });
    }

    openMod(content) {
        if (!this.isEditing) {
            this.modalService.open(content, { size: 'lg', windowClass: 'modalPermissions', });
        } else {

        }
    }

    // EDIT

    editProfile(){
        this.enableDisable(1);
        this.permissionDelete = false;
        this.permissionEdit = false;
        this.permissionCancelEdit = true;
        this.permissionConfirmEdit = true;
        this.getAccessProfile();
        // this.labelButton = "Adicionar Documentos";
    }

    // DELETE

    open(name: string, id){
        const modalRef = this.modalService.open(MODALS[name]);
        modalRef.componentInstance.item = id;
        modalRef.componentInstance.data = {
            msgConfirmDelete: 'Perfil de Acesso foi deletado com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Perfil de Acesso?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao Perfil de Acesso serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(itemId => {
            this.delete(itemId);
        });
    }

    delete(id){
        this.loading = true;
        this.profilesSrv.delete(id).subscribe(
            response => {
                this.loading = false;
                this.successMsgSrv.successMessages('Peril deletado com sucesso.');
                this.activeModal.close('Delete');
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR:', error);
            }
        );
    }

    // FINALIZAÇÃO

    cancelEditNew() {
        if (this.isNew) {
          this.close();
        } else {
          this.enableDisable(0);
          this.getAccessProfile();
          this.permissionEdit = JSON.parse(window.localStorage.getItem('actions'))[0].change;
          this.permissionDelete = JSON.parse(window.localStorage.getItem('actions'))[0].delete;
          this.permissionCancelEdit = false;
          this.permissionConfirmEdit = false;
        }
    }

    submit(){}

}
