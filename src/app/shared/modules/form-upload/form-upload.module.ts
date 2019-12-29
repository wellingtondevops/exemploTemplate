import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormUploadComponent } from './form-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonsCustomModule } from '..';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';


@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, ButtonsCustomModule, ImageViewerModule],
    declarations: [FormUploadComponent],
    exports: [FormUploadComponent]
})
export class FormUploadModule {}
