import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerTransition } from '../../../router.animations';
import * as moment from 'moment';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

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
    id: String;
    user: any;
    userForm: FormGroup;
    changeUp = false;
    profilesList: any;
    loading: Boolean = true;

    constructor(
        private route: ActivatedRoute,
        private userSrv: UsersService,
        private fb: FormBuilder,
        private errorMsg: ErrorMessagesService,
        private _route: Router,
        private successMsgSrv: SuccessMessagesService,
        private modalService: NgbModal,
        public modal: NgbActiveModal
    ) {
        this.profilesList = ProfileEnum;
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            _id: '',
            email: this.fb.control({ value: '', disabled: true }, [Validators.required, Validators.email]),
            name: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            profiles: this.fb.control({ value: '', disabled: true }, [Validators.required]),
            dateCreated: this.fb.control({ value: '', disabled: true })
        });

        this.id = this.route.snapshot.paramMap.get('id');
        this.getUser();
    }

    get name() {
        return this.userForm.get('name');
    }

    get email() {
        return this.userForm.get('email');
    }

    get profiles() {
        return this.userForm.get('profiles');
    }

    getUser() {
        this.userSrv.user(this.id).subscribe(
            data => {
                this.loading = false;
                this.user = data;
                this.userForm.patchValue({
                    _id: data._id,
                    email: data.email,
                    name: data.name,
                    profiles: data.profiles,
                    dateCreated: moment(data.dateCreated).format('YYYY-MM-DD')
                });
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    changeUpdate() {
        !this.changeUp ? (this.changeUp = true) : (this.changeUp = false);
        if (this.changeUp) {
            this.userForm.reset({
                _id: this.user._id,
                email: { value: this.user.email, disabled: false },
                name: { value: this.user.name, disabled: false },
                profiles: { value: this.user.profiles, disabled: false },
                dateCreated: { value: moment(this.user.dateCreated).format('YYYY-MM-DD'), disabled: true }
            });
        }
    }

    editUser(user) {
        this._route.navigate(['/users/edit', user]);
    }

    delete(data) {
        this.loading = true;
        this.userSrv.deleteUser(data).subscribe(
            response => {
                this.loading = false;
                this.successMsgSrv.successMessages('Usuário deletado com sucesso.');
                this._route.navigate(['/users']);
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
            msgConfirmDelete: 'Usuário foi deletado com sucesso.',
            msgQuestionDeleteOne: 'Você tem certeza que deseja deletar o Usuário?',
            msgQuestionDeleteTwo: 'Todas as informações associadas ao usuário serão deletadas.'
        };
        modalRef.componentInstance.delete.subscribe(item => {
            this.delete(item);
        });
    }
}
