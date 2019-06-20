import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DoctypesRoutingModule } from './doctypes-routing.module';
import { PageHeaderModule } from 'src/app/shared';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DoctypesRoutingModule,
    PageHeaderModule
  ]
})
export class DoctypesModule { }
