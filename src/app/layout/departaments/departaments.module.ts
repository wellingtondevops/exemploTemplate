import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentsRoutingModule } from './departaments-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonBackModule, ButtonsCustomModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EditComponent, ModalContentComponent],
  imports: [
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    NgbModule,
    TranslateModule,
    ButtonBackModule,
    ButtonsCustomModule,
    NgxLoadingModule,
    DepartamentsRoutingModule,
    CommonModule,
    NgxDatatableModule
  ],
  providers: [NgbActiveModal, CaseInsensitive],
  entryComponents: [ModalContentComponent],
})
export class DepartamentsModule { }
