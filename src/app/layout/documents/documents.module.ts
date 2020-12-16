import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@NgModule({
  declarations: [ListComponent, NewComponent, EditComponent, EnumToArrayPipe, ShowComponent],
  imports: [
    PageHeaderModule,
    NgbModule,
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    TranslateModule,
    ButtonsCustomModule,
    ButtonBackModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [CaseInsensitive]
})
export class DocumentsModule { }
