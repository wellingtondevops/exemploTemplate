import { AccessProfileGuardService } from 'src/app/services/guard/access-profile-guard.service';
import { EditComponent } from './edit/edit.component';
import { UsersGuardService } from 'src/app/services/guard/users-guard.service';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { TermsService } from 'src/app/services/guard/terms.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'get/:id',
        component: ShowComponent,
        // canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'edit:/id',
        component: EditComponent,
        canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'new',
        component: NewComponent,
        canActivate: [UsersGuardService, TermsService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessProfilesRoutingModule {}
