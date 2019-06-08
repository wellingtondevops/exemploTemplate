import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { ArquivesRoutingModule } from './arquives-routing.module';
import { PageHeaderModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, ShowComponent],
  imports: [
    CommonModule,
    ArquivesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ArquivesModule { }
