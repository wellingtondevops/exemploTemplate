import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { DaenerysTywinGuardService as DaenerysTywinGuard } from 'src/app/services/guard/daenerys-tywin-guard.service';
import { DaenerysTywinSnowGuardService as DaenerysTywinSnowGuard } from 'src/app/services/guard/daenerys-tywin-snow-guard.service';
import { ImportVolumeComponent } from './import-volume/import-volume.component';
import { ErrorsVolumesComponent } from './errors-volumes/errors-volumes.component';
import { VolumesImportGuardService } from 'src/app/services/guard/volumes-import-guard.service';
import { VolumesSearchGuardService } from 'src/app/services/guard/volumes-search-guard.service';
import { VolumesErrorGuardService } from 'src/app/services/guard/volumes-error-guard.service';
import { VolumesShowGuardService } from 'src/app/services/guard/volumes-show-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [VolumesSearchGuardService, TermsService]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [VolumesShowGuardService, TermsService]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canActivate: [DaenerysTywinGuard, TermsService]
  },
  {
    path: 'new',
    component: NewComponent,
    canActivate: [DaenerysTywinGuard, TermsService]
  },
  {
    path: 'import-volumes',
    component: ImportVolumeComponent,
    canActivate: [VolumesImportGuardService, TermsService]
  },
  {
    path: 'errors-volumes',
    component: ErrorsVolumesComponent,
    canActivate: [VolumesErrorGuardService, TermsService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolumesRoutingModule { }
