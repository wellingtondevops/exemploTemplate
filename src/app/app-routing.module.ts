import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './login/login.module#LoginModule', data: { state: 'home' } },
    { path: 'moviment-extract/:id', loadChildren: './extract/extract.module#ExtractModule' },
    { path: 'terms', loadChildren: './terms/terms.module#TermsModule' },
    { path: 'privacity-politic', loadChildren: './privacity-politic/privacity-politic.module#PrivacityPoliticModule' },
    { path: 'terms-of-use', loadChildren: './terms-of-use/terms-of-use.module#TermsOfUseModule' },
    { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule', data: { state: 'about' } },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'not-authorized', loadChildren: './not-authorized/not-authorized.module#NotAuthorizedModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const AppRouting = RouterModule.forRoot(routes, {
    useHash: true
});
