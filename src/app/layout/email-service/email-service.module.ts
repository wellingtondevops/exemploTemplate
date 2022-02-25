import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { TranslateModule } from '@ngx-translate/core';
import { EmailServiceRoutingModule } from './email-service-routing.module';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-type-ahead';
import { ShowComponent } from './show/show.component';

@NgModule({
    declarations: [ListComponent, ShowComponent],
    imports: [
        CommonModule,
        NgbModule,
        TranslateModule,
        EmailServiceRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        ButtonsCustomModule,
        ButtonBackModule,
        TypeaheadModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal, CaseInsensitive]
})
export class EmailServiceModule { }
