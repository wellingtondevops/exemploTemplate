import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule } from 'src/app/shared';
import { CompaniesRoutingModule } from './companies-routing.module';
import { ListComponent } from './list/list.component';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { TranslateModule } from '@ngx-translate/core';
import { TextMaskModule } from 'angular2-text-mask';
import { ShowComponent } from './show/show.component';

@NgModule({
    declarations: [ListComponent, NewComponent, EditComponent, EnumToArrayPipe, ShowComponent],
    imports: [
        CommonModule,
        CompaniesRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        TranslateModule,
        TextMaskModule,
        ButtonsCustomModule
    ]
})
export class CompaniesModule {}
