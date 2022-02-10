import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { TypeaheadModule } from 'ngx-type-ahead';
import { NgSelectModule } from '@ng-select/ng-select';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { ShowComponent } from './show/show.component';

@NgModule({
    declarations: [ShowComponent],
    imports: [
        NgbModule,
        CommonModule,
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
export class UserPermissionsModule { }
