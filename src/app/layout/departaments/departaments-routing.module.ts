import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DepartamentsGuardService } from 'src/app/services/guard/departaments-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService]
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [DaenerysTywinGuard, DepartamentsGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartamentsRoutingModule { }
