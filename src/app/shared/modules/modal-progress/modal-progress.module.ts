import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule, NgbProgressbar, NgbProgressbarModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { ModalProgressComponent } from './modal-progress.component';

@NgModule({
  declarations: [ModalProgressComponent],
  exports: [ModalProgressComponent],
  imports: [
    NgbProgressbarModule,
    CommonModule,
    NgbModalModule
  ],
  entryComponents: [ModalProgressComponent],
  providers: [
    NgbActiveModal,
  ]
})
export class ModalProgressModule { }
