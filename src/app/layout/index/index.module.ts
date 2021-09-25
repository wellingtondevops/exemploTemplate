import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PageHeaderModule, DatatablesModule, ButtonBackModule, ButtonsCustomModule, FormIndexModule, FormUploadModule } from 'src/app/shared';
import { NgxLoadingModule } from 'ngx-loading';
import { NewComponent } from './new/new.component';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
  declarations: [NewComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    FormIndexModule,
    DatatablesModule,
    NgxDatatableModule,
    NgbModule,
    TranslateModule,
    ButtonBackModule,
    ButtonsCustomModule,
    NgxExtendedPdfViewerModule,
    FormUploadModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [CaseInsensitive]
})
export class IndexModule { }
