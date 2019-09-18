import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFileRoutingModule { }
