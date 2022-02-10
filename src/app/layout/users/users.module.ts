import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditComponent } from './edit/edit.component';
import { AlterPasswordComponent } from './alter-password/alter-password.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TypeaheadModule } from 'ngx-type-ahead';
import { NgSelectModule } from '@ng-select/ng-select';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';

@NgModule({
    declarations: [ListComponent, ShowComponent, NewComponent, EnumToArrayPipe, EditComponent, AlterPasswordComponent],
    imports: [
        NgbModule,
        CommonModule,
        UsersRoutingModule,
        PageHeaderModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        ButtonsCustomModule,
        ButtonBackModule,
        NgSelectModule,
        TypeaheadModule,
        NgxDatatableModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal, CaseInsensitive]
})
export class UsersModule {}
