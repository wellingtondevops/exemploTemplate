import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TermsOfUseRoutingModule } from './terms-of-use-routing.module';
import { TermsOfUseComponent } from './terms-of-use.component';

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [
    NgbModule,
    CommonModule,
    TermsOfUseRoutingModule
  ],
  providers: []
})
export class TermsOfUseModule { }
