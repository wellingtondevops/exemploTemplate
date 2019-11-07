import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { PageHeaderModule, FormUploadModule, ButtonBackModule, ButtonsCustomModule, FormIndexModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnumToArrayPipe } from '../companies/new/new.component';

@NgModule({
  declarations: [ListComponent, ShowComponent, EnumToArrayPipe,],
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
    NgxLoadingModule.forRoot({})
  ]
})
export class ArchivesModule { }
