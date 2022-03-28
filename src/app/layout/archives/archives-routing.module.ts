import { SimpleShowComponent } from './simple-show/simple-show.component';
import { SimpleListComponent } from './simple-list/simple-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysTywinSnowGuardService as DaenerysTywinSnowGuard } from 'src/app/services/guard/daenerys-tywin-snow-guard.service';
import { ArchivesSearchGuardService } from 'src/app/services/guard/archives-search-guard.service';
import { ArchivesShowGuardService } from 'src/app/services/guard/archives-show-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
    {
        path: 'list',
        component: ListComponent,
        canActivate: [ArchivesSearchGuardService, TermsService]
    },
    {
        path: 'get/:id',
        component: ShowComponent,
        canActivate: [ArchivesShowGuardService, TermsService]
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        /* canActivate: [ArchivesShowGuardService, TermsService] */
    },
    {
        path: 'simple',
        component: SimpleListComponent,
    },
    {
        path: 'simple/get/:id',
        component: SimpleShowComponent,
        canActivate: [ArchivesShowGuardService, TermsService]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArchivesRoutingModule { }
