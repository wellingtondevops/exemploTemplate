import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatatableRowDetailsComponent } from './datatable-row-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [DatatableRowDetailsComponent],
  exports: [DatatableRowDetailsComponent],
  imports: [
    CommonModule,
    NgxDatatableModule
  ]
})
export class DatatableRowDetailsModule { }
