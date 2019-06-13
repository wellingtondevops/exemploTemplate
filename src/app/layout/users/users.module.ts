import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { PageHeaderModule } from 'src/app/shared';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';

@NgModule({
  declarations: [ListComponent, ShowComponent, NewComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule { }
