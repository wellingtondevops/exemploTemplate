import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { VolumesRoutingModule } from './volumes-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ImportVolumeComponent } from './import-volume/import-volume.component';
import { ModalImportRightBottomModule } from 'src/app/shared/modules/modal-import-right-bottom/modal-import-right-bottom.module';
import { ErrorsVolumesComponent } from './errors-volumes/errors-volumes.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EnumToArrayPipe, EditComponent, ImportVolumeComponent, ErrorsVolumesComponent],
  imports: [
    CommonModule,
    VolumesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    NgxDatatableModule,
    NgbModule,
    ModalImportRightBottomModule,
    TranslateModule,
    ButtonBackModule,
    ButtonsCustomModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal, CaseInsensitive]
})
export class VolumesModule { }
