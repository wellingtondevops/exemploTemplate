import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtractComponent } from './extract.component';
import { ExtractRoutingModule } from '../extract/extract-routing.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    ExtractComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ExtractRoutingModule
  ]
})
export class ExtractModule { }
