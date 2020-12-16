import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFileRoutingModule } from './register-file-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, FormIndexModule, FormUploadModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ListComponent, EnumToArrayPipe } from './list/list.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ImportFileComponent } from './import-file/import-file.component';
import { ModalProgressRightBottomModule } from 'src/app/shared/modules/modal-progress-right-bottom/modal-progress-right-bottom.module';
import { ModalImportRightBottomModule } from 'src/app/shared/modules/modal-import-right-bottom/modal-import-right-bottom.module';
import { ErrorsArchivesComponent } from './errors-archives/errors-archives.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@NgModule({
  declarations: [ListComponent, EnumToArrayPipe, ImportFileComponent, ErrorsArchivesComponent],
  imports: [
    CommonModule,
    RegisterFileRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    FormUploadModule,
    FormIndexModule,
    NgbModule,
    TranslateModule,
    ButtonsCustomModule,
    NgxDatatableModule,
    ModalImportRightBottomModule,
    ModalProgressRightBottomModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal, CaseInsensitive]
})
export class RegisterFileModule { }
