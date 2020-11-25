import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EditComponent],
  imports: [
    CommonModule
  ]
})
export class MenuServicesModule { }
