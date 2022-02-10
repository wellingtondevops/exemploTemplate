import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersGuardService } from 'src/app/services/guard/users-guard.service';
import { TermsService } from 'src/app/services/guard/terms.service';
import { ShowComponent } from './show/show.component';


const routes: Routes = [
    {
        path: 'userpermissions/:id',
        component: ShowComponent
    },
];

@NgModule({
        declarations: [],
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
export class UserPermissionsRoutingModule { }
