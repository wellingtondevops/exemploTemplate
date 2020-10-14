import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrivacityPoliticComponent } from './privacity-politic.component';
import { PrivacityPoliticRoutingModule } from './privacity-politic-routing.module';

@NgModule({
  declarations: [PrivacityPoliticComponent],
  imports: [
    NgbModule,
    CommonModule,
    PrivacityPoliticRoutingModule
  ],
  providers: []
})
export class PrivacityPoliticModule { }
