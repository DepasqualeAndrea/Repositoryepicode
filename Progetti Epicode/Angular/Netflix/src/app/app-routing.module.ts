import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';
import { FavouritersPageComponent } from './components/favouriters.page/favouriters.page.component';
import { InfoDettagliateComponent } from './components/info-dettagliate/info-dettagliate.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,

    },
    {
        path: 'movies',
        component: HomeMoviesComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'users',
        component: HomeMoviesComponent
    },
    {
        path: 'favourites',
        component: FavouritersPageComponent
    },
    {
        path: 'info_services',
        component: InfoDettagliateComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
