import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DocumentsGuardService } from 'src/app/services/guard/documents-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [DaenerysTywinGuard, DocumentsGuardService, TermsService]
    },
    {
        path: 'get/:id',
        component: ShowComponent,
        canActivate: [DaenerysTywinGuard, DocumentsGuardService, TermsService]
    },
    {
        path: 'new',
        component: NewComponent,
        canActivate: [DaenerysTywinGuard, DocumentsGuardService, TermsService]
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [DaenerysTywinGuard, DocumentsGuardService, TermsService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DocumentsRoutingModule {}
