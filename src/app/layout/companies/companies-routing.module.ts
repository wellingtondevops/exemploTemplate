import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';

const routes: Routes = [
    {
      path: '',
      component: ListComponent,
      canActivate: [DaenerysTywinGuard]
    },
    {
      path: 'get/:id',
      component: ShowComponent,
      canActivate: [DaenerysTywinGuard]
    },
    {
      path: 'edit/:id',
      component: EditComponent,
      canActivate: [DaenerysTywinGuard]
    },
    {
      path: 'new',
      component: NewComponent,
      canActivate: [DaenerysTywinGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CompaniesRoutingModule {}
