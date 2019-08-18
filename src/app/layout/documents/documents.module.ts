import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { PageHeaderModule, DatatablesModule, ButtonsCustomModule } from 'src/app/shared';
import { NewComponent, EnumToArrayPipe } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [ListComponent, NewComponent, EditComponent, EnumToArrayPipe, ShowComponent],
    imports: [
        CommonModule,
        DocumentsRoutingModule,
        PageHeaderModule,
        ReactiveFormsModule,
        FormsModule,
        DatatablesModule,
        TranslateModule,
        ButtonsCustomModule,
        NgxLoadingModule.forRoot({})
    ]
})
export class DocumentsModule {}
