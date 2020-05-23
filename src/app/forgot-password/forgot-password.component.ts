import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [routerTransition()]
})
export class ForgotPasswordComponent implements OnInit {
  resetPassForm: FormGroup;
  public loading: Boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loading = false;
    this.resetPassForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
  }

  onResetPass(){
    
  }

}
