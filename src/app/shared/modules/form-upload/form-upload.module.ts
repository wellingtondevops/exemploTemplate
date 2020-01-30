import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormUploadComponent } from './form-upload.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { ButtonsCustomModule } from '..';


@NgModule({
    imports: [CommonModule, RouterModule, NgbModule, ImageViewerModule, ButtonsCustomModule],
    declarations: [FormUploadComponent],
    exports: [FormUploadComponent]
})
export class FormUploadModule {}
