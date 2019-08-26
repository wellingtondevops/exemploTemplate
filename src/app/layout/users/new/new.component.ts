import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { ProfileEnum } from 'src/app/models/profile.enum';
import { SuccessMessagesService } from 'src/app/utils/success-messages.service';
import { ErrorMessagesService } from 'src/app/utils/error-messages.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss'],
    animations: [routerTransition()]
})
export class NewComponent implements OnInit {
    user: Object;
    userForm: FormGroup;
    profilesList: any;
    loading: Boolean = false;

    constructor(
        private _route: Router,
        private userSrv: UsersService,
        private fb: FormBuilder,
        private successMsgSrv: SuccessMessagesService,
        private errorMsg: ErrorMessagesService
    ) {
        this.profilesList = ProfileEnum;
    }

    ngOnInit() {
        this.userForm = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            name: this.fb.control('', [Validators.required]),
            profiles: this.fb.control('', [Validators.required])
        });
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

    postUser() {
        this.loading = true;
        this.userSrv.newUser(this.userForm.value).subscribe(
            data => {
                if (data._id) {
                    this.loading = false;
                    this.successMsgSrv.successMessages('Usuário cadastrado com sucesso.');
                    this._route.navigate(['/users']);
                }
            },
            error => {
                this.loading = false;
                this.errorMsg.errorMessages(error);
                console.log('ERROR: ', error);
            }
        );
    }
}

@Pipe({
    name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
    transform(data: Object) {
        const keys = Object.keys(data);
        return keys.slice(keys.length / 2);
    }
}
