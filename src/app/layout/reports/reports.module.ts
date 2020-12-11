import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonBackModule, ButtonsCustomModule, DatatablesModule, PageHeaderModule } from 'src/app/shared';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ReportsComponent],
  imports: [
    NgbModule,
    CommonModule,
    ReportsRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    TranslateModule,
    ButtonsCustomModule,
    ButtonBackModule,
    NgxLoadingModule.forRoot({})
  ]
})
export class ReportsModule { }
