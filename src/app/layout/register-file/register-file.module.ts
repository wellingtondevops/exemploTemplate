import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFileRoutingModule } from './register-file-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, FormIndexModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxLoadingModule } from 'ngx-loading';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    RegisterFileRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    FormIndexModule,
    NgbModule,
    TranslateModule,
    ButtonsCustomModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [NgbActiveModal]
})
export class RegisterFileModule { }
