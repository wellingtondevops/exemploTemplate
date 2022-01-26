import { ListComponent } from './list/list.component';
import { TermsService } from 'src/app/services/guard/terms.service';
import { UsersGuardService } from 'src/app/services/guard/users-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [UsersGuardService, TermsService]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccessProfilesRoutingModule {}
