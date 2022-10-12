import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent, EnumToArrayPipe } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { PageHeaderModule, FormUploadModule, ButtonBackModule, ButtonsCustomModule,
  FormIndexModule, 
  NgbdModalConfirmModule,
  DatatablesModule} from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalProgressRightBottomModule } from 'src/app/shared/modules/modal-progress-right-bottom/modal-progress-right-bottom.module';
import { EditComponent } from './edit/edit.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { SimpleListComponent } from './simple-list/simple-list.component';
import { SimpleShowComponent } from './simple-show/simple-show.component';
import { AuditComponent } from './audit/audit.component';
import { AuditShowComponent } from './audit-show/audit-show.component';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { ModalFilterComponent } from './modal-filter/modal-filter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [ListComponent, ShowComponent, EnumToArrayPipe, EditComponent, SimpleListComponent, SimpleShowComponent, AuditComponent, AuditShowComponent, ModalContentComponent, ModalFilterComponent],
  imports: [
    NgbModule,
    CommonModule,
    ArchivesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    FormUploadModule,
    ButtonBackModule,
    ButtonsCustomModule,
    DatatablesModule,
    FormIndexModule,
    ModalProgressRightBottomModule,
    NgxLoadingModule.forRoot({}),
    NgbdModalConfirmModule,
    NgMultiSelectDropDownModule
  ],
  providers: [CaseInsensitive, NgbActiveModal],
  entryComponents: [ModalContentComponent, NgbdModalConfirmComponent, ModalFilterComponent]
})
export class ArchivesModule { }
