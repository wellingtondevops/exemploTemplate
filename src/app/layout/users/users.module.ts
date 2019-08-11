import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule } from 'src/app/shared';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AlterPasswordComponent } from './alter-password/alter-password.component';

@NgModule({
    declarations: [ListComponent, ShowComponent, NewComponent, EnumToArrayPipe, EditComponent, AlterPasswordComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        ButtonsCustomModule
    ],
    providers: [NgbActiveModal]
})
export class UsersModule {}
