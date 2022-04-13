import { ErrorMessagesService } from 'src/app/utils/error-messages/error-messages.service';
import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()],
    providers: [TranslateService]
})
export class SignupComponent implements OnInit {
    loading = false;
    signupForm: FormGroup;

    constructor(
        public router: Router,
        private fb: FormBuilder,
        private AuthSrv: AuthService,
        private errorMsg: ErrorMessagesService
    ) {}

    ngOnInit() {
        this.loading = false;
        this.signupForm = this.fb.group({
            name: this.fb.control('', [Validators.required, Validators.minLength(3)]),
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
            newpass: this.fb.control('', [Validators.required, Validators.minLength(6)])
        });

    }

    signupNow(){

    }
}
