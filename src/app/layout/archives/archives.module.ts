import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { ArchivesRoutingModule } from './archives-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [ListComponent, ShowComponent],
  imports: [
    CommonModule,
    ArchivesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    FormsModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class ArchivesModule { }
