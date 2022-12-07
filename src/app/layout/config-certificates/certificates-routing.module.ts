import { ModalContentComponent } from './modal-content/modal-content.component';
import { ModalUploadCertificateComponent } from './modalUploadCertificate/modalUploadCertificate.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'new',
    component: ModalUploadCertificateComponent,
  },
  {
    path: 'show',
    component: ModalContentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificatesRoutingModule { }
