import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentsRoutingModule } from './departaments-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonBackModule, ButtonsCustomModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [],
  imports: [
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    NgbModule,
    TranslateModule,
    ButtonBackModule,
    ButtonsCustomModule,
    NgxLoadingModule,
    DepartamentsRoutingModule,
    CommonModule
  ]
})
export class DepartamentsModule { }
