import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { ImportFileComponent } from './import-file/import-file.component';

const routes: Routes = [
  {
    path: 'register',
    component: ListComponent
  },
  {
    path: 'import',
    component: ImportFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFileRoutingModule { }
