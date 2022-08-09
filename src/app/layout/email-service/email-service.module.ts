import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { TranslateModule } from '@ngx-translate/core';
import { EmailServiceRoutingModule } from './email-service-routing.module';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule, FormIndexModule, FormUploadModule, ModalProgressRightBottomModule, NgbdModalConfirmModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-type-ahead';
import { ShowComponent } from './show/show.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

@NgModule({
    declarations: [ListComponent, ShowComponent, ModalContentComponent],
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
        FormIndexModule,
        FormsModule,
        FormUploadModule,
        ButtonBackModule,
        ModalProgressRightBottomModule,
        TypeaheadModule,
        NgxDatatableModule,
        NgbdModalConfirmModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal, CaseInsensitive],
    entryComponents: [ModalContentComponent, NgbdModalConfirmComponent]
})
export class EmailServiceModule { }
