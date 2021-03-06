import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { CompaniesGuardService } from 'src/app/services/guard/companies-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
    {
      path: '',
      component: ListComponent,
      canActivate: [DaenerysTywinGuard, CompaniesGuardService, TermsService]
    },
    {
      path: 'get/:id',
      component: ShowComponent,
      canActivate: [DaenerysTywinGuard, CompaniesGuardService, TermsService]
    },
    {
      path: 'edit/:id',
      component: EditComponent,
      canActivate: [DaenerysGuard, CompaniesGuardService, TermsService]
    },
    {
      path: 'new',
      component: NewComponent,
      canActivate: [DaenerysGuard, CompaniesGuardService, TermsService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule {}
