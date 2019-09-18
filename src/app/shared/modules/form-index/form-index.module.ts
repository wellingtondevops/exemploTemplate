import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormIndexComponent } from './form-index.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormlyModule.forRoot(),
        FormlyBootstrapModule,
    ],
    declarations: [FormIndexComponent],
    exports: [FormIndexComponent]
})
export class FormIndexModule {}
