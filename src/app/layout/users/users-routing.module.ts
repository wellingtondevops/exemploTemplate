import { UsersPermissionsComponent } from './users-permissions/users-permissions.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { AlterPasswordComponent } from './alter-password/alter-password.component';
import { UsersGuardService } from 'src/app/services/guard/users-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'get/:id',
        component: ShowComponent,
        canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'new',
        component: NewComponent,
        canActivate: [UsersGuardService, TermsService]
    },
    {
        path: 'alter',
        component: AlterPasswordComponent
        // canActivate: [DaenerysGuard]
    },
    {
        path: 'userspermissions/:id',
        component: UsersPermissionsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
