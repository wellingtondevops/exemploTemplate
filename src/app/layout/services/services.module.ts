import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesRoutingModule } from './services-routing.module';
import { ButtonBackModule, ButtonsCustomModule, DatatablesModule, PageHeaderModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [ShowComponent, ListComponent, EditComponent, NewComponent],
  imports: [
    NgbModule,
    CommonModule,
    ServicesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    NgbModule,
    ButtonsCustomModule,
    ButtonBackModule,
    NgxLoadingModule.forRoot({})
],
providers: [NgbActiveModal]
})
export class ServicesModule { }
