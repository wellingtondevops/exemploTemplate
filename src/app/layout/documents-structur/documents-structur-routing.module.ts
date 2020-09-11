import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { TemplatesGuardService } from 'src/app/services/guard/templates-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [DaenerysGuard, TemplatesGuardService]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [DaenerysGuard, TemplatesGuardService]
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [DaenerysGuard, TemplatesGuardService]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [DaenerysGuard, TemplatesGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentsStructurRoutingModule { }
