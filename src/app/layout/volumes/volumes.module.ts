import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { VolumesRoutingModule } from './volumes-routing.module';
import { PageHeaderModule, DatatablesModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [ShowComponent, ListComponent, NewComponent, EditComponent],
  imports: [
    CommonModule,
    VolumesRoutingModule,
    PageHeaderModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
    AutocompleteLibModule
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class VolumesModule { }
