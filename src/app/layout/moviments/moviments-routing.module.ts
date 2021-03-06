import { NgModule } from '@angular/core';
import { ListComponent } from '../moviments/list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { ShowComponent } from '../moviments/show/show.component';
import { NewComponent } from '../moviments/new/new.component';
import { EditComponent } from '../moviments/edit/edit.component';
import { SearchArchivesComponent } from './search-archives/search-archives.component';
import { SearchVolumesComponent } from './search-volumes/search-volumes.component';

const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'get/:id',
    component: ShowComponent
  },
  {
    path: 'new',
    component: NewComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'searcharchives/:id',
    component: SearchArchivesComponent,
  },
  {
    path: 'searchvolumes/:id',
    component: SearchVolumesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentsRoutingModule { }
