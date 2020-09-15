import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ImportFileComponent } from './import-file/import-file.component';
import { ErrorsArchivesComponent } from './errors-archives/errors-archives.component';
import { ArchivesErrorGuardService } from 'src/app/services/guard/archives-error-guard.service';
import { ArchivesImportGuardService } from 'src/app/services/guard/archives-import-guard.service';
import { ArchivesRegisterGuardService } from 'src/app/services/guard/archives-register-guard.service';

const routes: Routes = [
  {
    path: 'register',
    component: ListComponent, canActivate: [ArchivesRegisterGuardService]
  },
  {
    path: 'import',
    component: ImportFileComponent, canActivate: [ArchivesImportGuardService]
  },
  {
    path: 'errors-archives',
    component: ErrorsArchivesComponent, canActivate: [ArchivesErrorGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterFileRoutingModule { }
