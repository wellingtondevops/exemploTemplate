import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProgressMultipleRightBottomComponent } from './modal-progress-multiple-right-bottom.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModalProgressMultipleRightBottomComponent
  ],
  exports: [ModalProgressMultipleRightBottomComponent],
  imports: [
    NgbProgressbarModule,
    CommonModule
  ],
  entryComponents: [ModalProgressMultipleRightBottomComponent],
})
export class ModalProgressMultipleRightBottomModule { }
