import { TypeaheadModule } from 'ngx-type-ahead';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatatablesModule, PageHeaderModule, ButtonsCustomModule, ButtonBackModule, NgbdModalConfirmModule } from 'src/app/shared';
import { NgxLoadingModule } from 'ngx-loading';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AccessProfilesRoutingModule } from './access-profiles-routing.module';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

@NgModule({
    declarations: [ListComponent, NewComponent, ShowComponent, EditComponent, ModalContentComponent],
    imports: [
        NgbModule,
        CommonModule,
        AccessProfilesRoutingModule,
        PageHeaderModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        ButtonsCustomModule,
        ButtonBackModule,
        NgMultiSelectDropDownModule,
        NgSelectModule,
        TypeaheadModule,
        NgxDatatableModule,
        NgbdModalConfirmModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal, CaseInsensitive],
    entryComponents: [ModalContentComponent, NgbdModalConfirmComponent]
})
export class AccessProfilesModule { }
