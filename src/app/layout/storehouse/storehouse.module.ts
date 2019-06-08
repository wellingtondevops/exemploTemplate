import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorehouseRoutingModule } from './storehouse-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StorehouseRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class StorehouseModule { }
