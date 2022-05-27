import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule, NgbdModalConfirmModule } from 'src/app/shared';
import { CompaniesRoutingModule } from './companies-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { ShowComponent } from './show/show.component';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

@NgModule({
    declarations: [ListComponent, NewComponent, EditComponent, ShowComponent, EnumToArrayPipe, ModalContentComponent],
    imports: [
        NgbModule,
        CommonModule,
        CompaniesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        TranslateModule,
        TextMaskModule,
        ButtonBackModule,
        ButtonsCustomModule,
        NgxLoadingModule.forRoot({}),
        NgxDatatableModule,
        NgbdModalConfirmModule
    ],
    exports: [EnumToArrayPipe],
    entryComponents: [ModalContentComponent, NgbdModalConfirmComponent],

})
export class CompaniesModule {}
