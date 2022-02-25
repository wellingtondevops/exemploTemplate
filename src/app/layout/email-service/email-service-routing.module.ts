import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { TermsService } from 'src/app/services/guard/terms.service';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { TemplatesGuardService } from 'src/app/services/guard/templates-guard.service';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [TermsService]
    },
    {
        path: 'get/:id',
        component: ShowComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EmailServiceRoutingModule { }
