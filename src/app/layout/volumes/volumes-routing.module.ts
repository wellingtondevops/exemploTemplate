import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: ':id', 
    component: ShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolumesRoutingModule { }
