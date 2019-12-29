import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalProgressRightBottomComponent } from './modal-progress-right-bottom.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    ModalProgressRightBottomComponent
  ],
  exports: [ModalProgressRightBottomComponent],
  imports: [
    NgbProgressbarModule,
    CommonModule
  ],
  entryComponents: [ModalProgressRightBottomComponent],
})
export class ModalProgressRightBottomModule { }
