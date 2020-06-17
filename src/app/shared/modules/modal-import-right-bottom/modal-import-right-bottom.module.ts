import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalImportRightBottomComponent } from './modal-import-right-bottom.component';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ModalImportRightBottomComponent
  ],
  exports: [ModalImportRightBottomComponent],
  imports: [
    NgbProgressbarModule,
    CommonModule,
    RouterModule
  ],
  entryComponents: [ModalImportRightBottomComponent],
})
export class ModalImportRightBottomModule { }
