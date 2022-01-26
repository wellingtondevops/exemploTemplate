import { TypeaheadModule } from 'ngx-type-ahead';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DatatablesModule, PageHeaderModule, ButtonsCustomModule, ButtonBackModule } from 'src/app/shared';
import { NgxLoadingModule } from 'ngx-loading';
import { CaseInsensitive } from 'src/app/utils/case-insensitive';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AccessProfilesRoutingModule } from './access-profiles-routing.module';

@NgModule({
    declarations: [ListComponent],
    imports: [
        NgbModule,
        CommonModule,
        AccessProfilesRoutingModule,
        PageHeaderModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        ButtonsCustomModule,
        ButtonBackModule,
        NgSelectModule,
        TypeaheadModule,
        NgxLoadingModule.forRoot({})
    ],
    providers: [NgbActiveModal, CaseInsensitive]
})
export class AccessProfilesModule { }
