import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule, DatatablesModule } from 'src/app/shared';
import { CompaniesRoutingModule } from './companies-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EditComponent, EnumToArrayPipe],
  imports: [
    CommonModule,
    CompaniesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    TranslateModule
  ]
})
export class CompaniesModule { }
