import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacityPoliticComponent } from './privacity-politic.component';

const routes: Routes = [
    {
        path: '',
        component: PrivacityPoliticComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrivacityPoliticRoutingModule {}
