import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';
import { NewComponent } from './new/new.component';

const routes: Routes = [
    {
      path: '',
      component: ListComponent,
      canActivate: [DaenerysTywinGuard, TermsService]
    },
    /* {
      path: 'get/:id',
      component: ShowComponent,
      canActivate: [DaenerysTywinGuard, CompaniesGuardService, TermsService]
    },
    {
      path: 'edit/:id',
      component: EditComponent,
      canActivate: [DaenerysGuard, CompaniesGuardService, TermsService]
    },
    */
    {
      path: 'new',
      component: NewComponent,
      canActivate: [DaenerysGuard, TermsService]
    } 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BatchesRoutingModule {}
