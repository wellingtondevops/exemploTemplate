import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent, EnumToArrayPipe } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { PageHeaderModule, FormUploadModule, ButtonBackModule, ButtonsCustomModule,
  FormIndexModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalProgressRightBottomModule } from 'src/app/shared/modules/modal-progress-right-bottom/modal-progress-right-bottom.module';
import { EditComponent } from './edit/edit.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { SimpleListComponent } from './simple-list/simple-list.component';

@NgModule({
  declarations: [ListComponent, ShowComponent, EnumToArrayPipe, EditComponent, SimpleListComponent],
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
    FormIndexModule,
    ModalProgressRightBottomModule,
    NgxLoadingModule.forRoot({}),
  ],
  providers: [CaseInsensitive]
})
export class ArchivesModule { }
