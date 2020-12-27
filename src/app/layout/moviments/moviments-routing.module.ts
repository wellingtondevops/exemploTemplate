import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from '../moviments/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from '../moviments/show/show.component';
import { NewComponent } from '../moviments/new/new.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'get/:id',
    component: ShowComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentsRoutingModule { }
