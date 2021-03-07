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
import { PageHeaderModule, ModalImportRightBottomModule, ButtonBackModule, ButtonsCustomModule, DatatablesModule } from 'src/app/shared';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { EditComponent } from './edit/edit.component';
import { EnumToArrayPipe, SearchVolumesComponent } from './search-volumes/search-volumes.component';
import { SearchArchivesComponent } from './search-archives/search-archives.component';


@NgModule({
  declarations: [ShowComponent, EnumToArrayPipe, ListComponent, NewComponent, EditComponent, SearchVolumesComponent, SearchArchivesComponent],
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
