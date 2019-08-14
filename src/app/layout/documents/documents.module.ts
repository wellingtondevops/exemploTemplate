import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { DocumentsRoutingModule } from './documents-routing.module';
import { PageHeaderModule, DatatablesModule } from 'src/app/shared';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
    declarations: [ListComponent, NewComponent, EditComponent, ShowComponent],
    imports: [CommonModule, DocumentsRoutingModule, PageHeaderModule, DatatablesModule, NgxLoadingModule.forRoot({})]
})
export class DocumentsModule {}
