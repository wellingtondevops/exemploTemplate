import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { DocumentsStructurRoutingModule } from './documents-structur-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TypeaheadModule } from 'ngx-type-ahead';

@NgModule({
  declarations: [ShowComponent, ListComponent, EditComponent, NewComponent],
  imports: [
    NgbModule,
    CommonModule,
    DocumentsStructurRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    ButtonsCustomModule,
    ButtonBackModule,
    TypeaheadModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal]
})
export class DocumentsStructurModule { }
