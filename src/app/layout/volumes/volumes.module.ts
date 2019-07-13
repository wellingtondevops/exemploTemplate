import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { VolumesRoutingModule } from './volumes-routing.module';
import { PageHeaderModule, DatatablesModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PageHeaderComponent } from 'src/app/shared/modules/page-header/page-header.component';

@NgModule({
  declarations: [ShowComponent, ListComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    VolumesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule
  ]
})
export class VolumesModule { }
