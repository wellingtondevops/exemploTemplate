import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { BatchesRoutingModule } from './batches-routing.module';
import { ListComponent } from './list/list.component';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';

import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ControlComponent } from './control/control.component';

@NgModule({
    declarations: [ListComponent, NewComponent, ShowComponent, ControlComponent],
    imports: [
        NgbModule,
        CommonModule,
        BatchesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        TranslateModule,
        TextMaskModule,
        ButtonBackModule,
        ButtonsCustomModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [CaseInsensitive]
})

export class BatchesModule {}
