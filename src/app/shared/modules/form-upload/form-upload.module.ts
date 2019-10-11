import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormUploadComponent } from './form-upload.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [FormUploadComponent],
    exports: [FormUploadComponent]
})
export class FormUploadModule {}
