import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';

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
      path: 'edit/:id',
      component: EditComponent
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
export class CompaniesRoutingModule {}
