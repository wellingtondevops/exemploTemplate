import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentsRoutingModule } from './moviments-routing.module';
import { ShowComponent } from '../companies/show/show.component';
import { ListComponent } from '../companies/list/list.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent],
  imports: [
    CommonModule,
    MovimentsRoutingModule
  ]
})
export class MovimentsModule { }
