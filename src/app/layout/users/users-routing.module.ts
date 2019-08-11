import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DaenerysGuardService as DaenerysGuard } from 'src/app/services/guard/daenerys-guard.service';
import { AlterPasswordComponent } from './alter-password/alter-password.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent,
        canActivate: [DaenerysGuard]
    },
    {
        path: 'get/:id',
        component: ShowComponent,
        canActivate: [DaenerysGuard]
    },
    {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [DaenerysGuard]
    },
    {
        path: 'new',
        component: NewComponent,
        canActivate: [DaenerysGuard]
    },
    {
        path: 'alter',
        component: AlterPasswordComponent
        // canActivate: [DaenerysGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule {}
