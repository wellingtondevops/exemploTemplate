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

@NgModule({
  declarations: [ListComponent, EnumToArrayPipe, ImportFileComponent],
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
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal]
})
export class RegisterFileModule { }
