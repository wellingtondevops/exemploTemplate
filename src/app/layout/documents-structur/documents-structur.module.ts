import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { DocumentsStructurRoutingModule } from './documents-structur-routing.module';

@NgModule({
  declarations: [ShowComponent, ListComponent, EditComponent, NewComponent],
  imports: [
    CommonModule,
    DocumentsStructurRoutingModule
  ]
})
export class DocumentsStructurModule { }
