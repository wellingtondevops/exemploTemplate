import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyServicesRoutingModule } from './company-services-routing.module';
import { ButtonBackModule, ButtonsCustomModule, DatatablesModule, PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { TypeaheadModule } from 'ngx-type-ahead';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [ShowComponent, ListComponent, EditComponent, NewComponent],
  imports: [
    NgbModule,
    CommonModule,
    CompanyServicesRoutingModule,
    PageHeaderModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    ButtonsCustomModule,
    ButtonBackModule,
    TypeaheadModule,
    TextMaskModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal, CurrencyPipe]
})
export class CompanyServicesModule { }
