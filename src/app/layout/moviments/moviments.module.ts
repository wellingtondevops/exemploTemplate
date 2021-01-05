import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovimentsRoutingModule } from './moviments-routing.module';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxLoadingModule } from 'ngx-loading';
import { PageHeaderModule, DatatablesModule, ModalImportRightBottomModule, ButtonBackModule, ButtonsCustomModule } from 'src/app/shared';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    MovimentsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    NgxDatatableModule,
    NgbModule,
    TranslateModule,
    ButtonBackModule,
    ButtonsCustomModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [ NgbActiveModal, CaseInsensitive ]
})
export class MovimentsModule { }
