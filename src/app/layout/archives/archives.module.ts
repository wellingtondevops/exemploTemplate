import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { PageHeaderModule, DatatableRowDetailsModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [ListComponent, ShowComponent],
  imports: [
    CommonModule,
    ArchivesRoutingModule,
    PageHeaderModule,
    DatatableRowDetailsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule
  ]
})
export class ArchivesModule { }
