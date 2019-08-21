import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { TywinGuardService as TywinGuard } from 'src/app/services/guard/tywin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [DaenerysGuard, TywinGuard]
  },
  {
    path: ':id',
    component: ShowComponent,
    canActivate: [DaenerysGuard, TywinGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivesRoutingModule {}
