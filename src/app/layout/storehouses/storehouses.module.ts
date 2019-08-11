import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorehousesRoutingModule } from './storehouses-routing.module';
import { PageHeaderModule, DatatablesModule, NgbdModalConfirmModule, ButtonsCustomModule } from 'src/app/shared';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalConfirmComponent } from 'src/app/shared/modules/ngbd-modal-confirm/ngbd-modal-confirm.component';

@NgModule({
    declarations: [ListComponent, ShowComponent, NewComponent, EditComponent],
    imports: [
        CommonModule,
        StorehousesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        NgbModule,
        ButtonsCustomModule
    ],
    providers: [NgbActiveModal]
})
export class StorehousesModule {}
