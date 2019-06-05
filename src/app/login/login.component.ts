import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup

    constructor(
      public router: Router,
      private fb: FormBuilder,
      private loginSrv: LoginService
    ) {}

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: this.fb.control('', [Validators.required, Validators.email]),
            password: this.fb.control('', [Validators.required, Validators.minLength(6)])
        })
    }

    onLoggedin() {
        console.warn(this.loginForm.value);
        this.loginSrv.login(this.loginForm.value).subscribe(() => {
            this.router.navigate(['/dashboard']);
        });
        localStorage.setItem('isLoggedin', 'true');
    }
}
