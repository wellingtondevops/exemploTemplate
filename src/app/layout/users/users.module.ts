import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { PageHeaderModule, DatatablesModule } from 'src/app/shared';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbdModalConfirmComponent } from '../../shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [ListComponent, ShowComponent, NewComponent, EnumToArrayPipe],
  imports: [
    CommonModule,
    UsersRoutingModule,
    PageHeaderModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    DatatablesModule,
  ],
  providers: [
    NgbActiveModal,
  ]
})
export class UsersModule { }
