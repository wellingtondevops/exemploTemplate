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
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ModalProgressRightBottomModule } from 'src/app/shared/modules/modal-progress-right-bottom/modal-progress-right-bottom.module';

@NgModule({
  declarations: [ListComponent, ShowComponent, EnumToArrayPipe],
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
    NgxSmartModalModule.forRoot()
  ]
})
export class ArchivesModule { }
