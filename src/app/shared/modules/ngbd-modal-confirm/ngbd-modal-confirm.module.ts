import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbdModalConfirmComponent } from './ngbd-modal-confirm.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [NgbdModalConfirmComponent],
  exports: [NgbdModalConfirmComponent],
  imports: [
    CommonModule,
    NgbModalModule
  ]
})
export class NgbdModalConfirmModule { }
