import { Routes } from '@angular/router';
import { LoginComponent } from '@core/authentication/login/login.component';
import { AdminDbComponent } from '@components/admin-db/admin-db.component';
import { AdminOmComponent } from '@components/admin-om/admin-om.component';
import { UserDbComponent } from '@components/user-db/user-db.component';
import { RegisterComponent } from '@core/authentication/register/register.component';
import { ForbiddenComponent } from '@components/forbidden/forbidden.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'admin-movies-om',
        component:AdminOmComponent
    },
    {
        path:'admin-movies-db',
        component:AdminDbComponent
    },
    {
        path:'user-movies-db',
        component:UserDbComponent
    },
    {
        path:'forbidden',
        component:ForbiddenComponent
    },
    {
        path:'**',
        redirectTo : 'login'
    }
];
