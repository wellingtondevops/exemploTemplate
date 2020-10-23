import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './terms.component';

@NgModule({
  declarations: [TermsComponent],
  imports: [
    NgbModule,
    CommonModule,
    TermsRoutingModule
  ],
  providers: []
})
export class TermsModule { }
