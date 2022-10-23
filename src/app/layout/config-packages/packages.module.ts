import { PackageRoutingModule } from './packages-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { TypeaheadModule } from 'ngx-type-ahead';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EditComponent],
  imports: [
    NgbModule,
    CommonModule,
    PackageRoutingModule,
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
export class PackageModule { }
