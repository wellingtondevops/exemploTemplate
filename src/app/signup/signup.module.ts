import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { NgxLoadingModule } from 'ngx-loading';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SignupRoutingModule,
    NgxLoadingModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [SignupComponent]
})
export class SignupModule { }
