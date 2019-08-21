import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { TywinGuardService as TywinGuard } from 'src/app/services/guard/tywin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [DaenerysGuard, TywinGuard]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [DaenerysGuard, TywinGuard]
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [DaenerysGuard, TywinGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [DaenerysGuard, TywinGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StorehousesRoutingModule { }
