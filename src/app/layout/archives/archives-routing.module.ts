import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { DaenerysTywinSnowGuardService as DaenerysTywinSnowGuard } from 'src/app/services/guard/daenerys-tywin-snow-guard.service';
import { ArchivesSearchGuardService } from 'src/app/services/guard/archives-search-guard.service';
import { ArchivesShowGuardService } from 'src/app/services/guard/archives-show-guard.service';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    canActivate: [ArchivesSearchGuardService]
  },
  {
    path: 'get/:id',
    component: ShowComponent,
    canActivate: [ArchivesShowGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArchivesRoutingModule {}
