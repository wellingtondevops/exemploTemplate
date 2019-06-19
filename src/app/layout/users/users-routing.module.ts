import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';

const routes: Routes = [
    {
      path: '',
      component: ListComponent,
    },
    {
      path: 'get/:id', 
      component: ShowComponent
    },
    {
      path: 'new',
      component: NewComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
