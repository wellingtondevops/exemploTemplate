import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { PageHeaderModule } from 'src/app/shared';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [ListComponent, ShowComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule
  ]
})
export class UsersModule { }
