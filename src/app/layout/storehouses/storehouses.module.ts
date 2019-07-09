import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorehousesRoutingModule } from './storehouses-routing.module';
import { PageHeaderModule, DatatablesModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [ListComponent, ShowComponent, NewComponent],
  imports: [
    CommonModule,
    StorehousesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule
  ]
})
export class StorehousesModule { }
