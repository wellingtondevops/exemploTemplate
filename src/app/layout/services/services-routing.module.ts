import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { StorehousesGuardService } from 'src/app/services/guard/storehouses-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    /* canActivate: [DaenerysTywinGuard, StorehousesGuardService, TermsService] */
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    /* canActivate: [DaenerysTywinGuard, StorehousesGuardService, TermsService] */
  },
  {
    path: 'new',
    component: NewComponent,
    /* canActivate: [DaenerysGuard, StorehousesGuardService, TermsService] */
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    /* canActivate: [DaenerysGuard, StorehousesGuardService, TermsService] */
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
