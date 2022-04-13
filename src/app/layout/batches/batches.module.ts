import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { ModalProgressMultipleRightBottomModule } from 'src/app/shared/modules/modal-progress-multiple-right-bottom/modal-progress-multiple-right-bottom.module'
import { BatchesRoutingModule } from './batches-routing.module';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';

import { NgxLoadingModule } from 'ngx-loading';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ControlComponent } from './control/control.component';
import { SafePipe } from 'src/app/utils/pipes/safe-pipe';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ControlImagesComponent } from './control-images/control-images.component';


@NgModule({
    declarations: [ListComponent, NewComponent, ShowComponent, ControlComponent, ControlImagesComponent],
    imports: [
        NgbModule,
        CommonModule,
        BatchesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        NgxDatatableModule,
        PdfViewerModule,
        TranslateModule,
        TextMaskModule,
        ButtonBackModule,
        ButtonsCustomModule,
        ModalProgressMultipleRightBottomModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [CaseInsensitive, NgbActiveModal]
})

export class BatchesModule {}
