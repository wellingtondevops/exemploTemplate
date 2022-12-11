import { ModalUploadCertificateComponent } from './modalUploadCertificate/modalUploadCertificate.component';
import { CertificatesRoutingModule } from './certificates-routing.module';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxLoadingModule } from 'ngx-loading';
import { TypeaheadModule } from 'ngx-type-ahead';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule, NgbdModalConfirmModule } from 'src/app/shared';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';

@NgModule({
  declarations: [ListComponent, ModalUploadCertificateComponent, ModalContentComponent],
  imports: [
    NgbModule,
    CommonModule,
    CertificatesRoutingModule,
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
export class CertificatesModule { }
