import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsService } from 'src/app/services/guard/terms.service';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [TermsService],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {
}
