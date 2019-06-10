import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { VolumesRoutingModule } from './volumes-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShowComponent, ListComponent],
  imports: [
    CommonModule,
    VolumesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VolumesModule { }
