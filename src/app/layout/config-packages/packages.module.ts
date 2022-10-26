import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
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
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule, NgbdModalConfirmModule } from 'src/app/shared';
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
    NgxDatatableModule,
    NgbdModalConfirmModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal, CurrencyPipe],
  entryComponents: [NgbdModalConfirmComponent]
})
export class PackageModule { }
