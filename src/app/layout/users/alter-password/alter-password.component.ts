import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { routerTransition } from 'src/app/router.animations';

@Component({
    selector: 'app-alter-password',
    templateUrl: './alter-password.component.html',
    styleUrls: ['./alter-password.component.scss'],
    animations: [routerTransition()]
})
export class AlterPasswordComponent implements OnInit {
    id: String;
    user: any;
    userForm: FormGroup;
    profilesList: any;

    constructor(
        private route: ActivatedRoute,
        private userSrv: UsersService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) {
        this.profilesList = ProfileEnum;
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            _id: '',
            email: this.fb.control({ value: '', disabled: true }),
            name: this.fb.control('', [Validators.required]),
            password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
            profiles: this.fb.control({ value: '', disabled: true })
        });

        this.id = localStorage.getItem('id');
        this.getUser();
    }

    get name() {
        return this.userForm.get('name');
    }

    get password() {
        return this.userForm.get('password');
    }

    getUser() {
        this.userSrv.user(this.id).subscribe(
            data => {
                this.user = data;
                this.userForm.patchValue({
                    _id: this.user._id,
                    email: data.email,
                    name: data.name,
                    password: '',
                    profiles: data.profiles
                });
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }

    updateUser() {
        this.userSrv.updateUser(this.userForm.value).subscribe(
            data => {
                this.successMsgSrv.successMessages('Usuário alterado com sucesso.');
                this.user = data;
                this.userForm.patchValue({
                    _id: this.user._id,
                    email: this.user.email,
                    name: data.name
                });
            },
            error => {
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}
