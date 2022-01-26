import { EditComponent } from './edit/edit.component';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { TermsService } from 'src/app/services/guard/terms.service';
import { UsersGuardService } from 'src/app/services/guard/users-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
    },
    {
        path: 'get/id',
        component: ShowComponent,
    },
    {
        path: 'edit/id',
        component: EditComponent,
    },
    {
        path: 'new',
        component: NewComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessProfilesRoutingModule {}
