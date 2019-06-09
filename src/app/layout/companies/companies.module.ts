import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule } from 'src/app/shared';
import { CompaniesRoutingModule } from './companies-routing.module';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ShowComponent, ListComponent],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CompaniesModule { }
