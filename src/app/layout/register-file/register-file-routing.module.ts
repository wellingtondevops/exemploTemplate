import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ImportFileComponent } from './import-file/import-file.component';
import { ErrorsArchivesComponent } from './errors-archives/errors-archives.component';

const routes: Routes = [
  {
    path: 'register',
    component: ListComponent
  },
  {
    path: 'import',
    component: ImportFileComponent
  },
  {
    path: 'errors-archives',
    component: ErrorsArchivesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFileRoutingModule { }
