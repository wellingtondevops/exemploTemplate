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

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [VolumesSearchGuardService]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [DaenerysTywinSnowGuard]
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
  },
  {
    path: 'import-volumes',
    component: ImportVolumeComponent,
    canActivate: [VolumesImportGuardService]
  },
  {
    path: 'errors-volumes',
    component: ErrorsVolumesComponent,
    canActivate: [VolumesErrorGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VolumesRoutingModule { }
