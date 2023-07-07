import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
//import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/login/auth.guard';
import { FavouritersPageComponent } from './components/favouriters.page/favouriters.page.component';
import { InfoDettagliateComponent } from './components/info-dettagliate/info-dettagliate.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';


const routes: Routes = [
    {
        path: '',
        component: SingUpComponent,

    },
    {
        path: 'movies',
        component: HomeMoviesComponent,
        canActivate: [AuthGuard]

    },
    {
        path: 'users',
        component: HomeMoviesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'favourites',
        component: FavouritersPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'info_services/:id',
        component: InfoDettagliateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'nav-bar',
        component:NavBarComponent,
        canActivate: [AuthGuard]
    }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
