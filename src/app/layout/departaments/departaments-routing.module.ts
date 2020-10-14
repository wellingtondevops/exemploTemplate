import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DepartamentsGuardService } from 'src/app/services/guard/departaments-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService, TermsService]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService, TermsService]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService, TermsService]
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService, TermsService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentsRoutingModule { }
