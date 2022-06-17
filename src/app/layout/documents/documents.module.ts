import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule, NgbdModalConfirmModule } from 'src/app/shared';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

@NgModule({
  declarations: [ListComponent, NewComponent, EditComponent, EnumToArrayPipe, ShowComponent, ModalContentComponent],
  imports: [
    PageHeaderModule,
    NgbModule,
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    TranslateModule,
    ButtonsCustomModule,
    ButtonBackModule,
    NgxDatatableModule,
    NgbdModalConfirmModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [CaseInsensitive],
  entryComponents: [ModalContentComponent, NgbdModalConfirmComponent]
})
export class DocumentsModule { }
