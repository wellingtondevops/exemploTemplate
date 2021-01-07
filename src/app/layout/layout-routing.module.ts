import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'users', loadChildren: './users/users.module#UsersModule' },
            { path: 'moviments', loadChildren: './moviments/moviments.module#MovimentsModule' },
            { path: 'reports', loadChildren: './reports/reports.module#ReportsModule' },
            { path: 'requesters', loadChildren: './requesters/requesters.module#RequestersModule' },
            { path: 'company-services', loadChildren: './company-services/company-services.module#CompanyServicesModule' },
            { path: 'menu-services', loadChildren: './menu-services/menu-services.module#MenuServicesModule' },
            { path: 'departaments', loadChildren: './departaments/departaments.module#DepartamentsModule' },
            { path: 'companies', loadChildren: './companies/companies.module#CompaniesModule' },
            { path: 'documents-structur', loadChildren: './documents-structur/documents-structur.module#DocumentsStructurModule' },
            { path: 'storehouses', loadChildren: './storehouses/storehouses.module#StorehousesModule' },
            { path: 'file', loadChildren: './register-file/register-file.module#RegisterFileModule' },
            { path: 'archives', loadChildren: './archives/archives.module#ArchivesModule' },
            { path: 'volumes', loadChildren: './volumes/volumes.module#VolumesModule' },
            { path: 'documents', loadChildren: './documents/documents.module#DocumentsModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
