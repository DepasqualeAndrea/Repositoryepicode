import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeMoviesComponent } from './components/home-movies/home-movies.component';
import { HttpClientModule} from '@angular/common/http';
//import { LoginComponent } from './auth/login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { FavouritersPageComponent } from './components/favouriters.page/favouriters.page.component';
import { InfoDettagliateComponent } from './components/info-dettagliate/info-dettagliate.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import {  SlickCarouselModule } from 'ngx-slick-carousel';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeMoviesComponent,
    //LoginComponent,
    FavouritersPageComponent,
    InfoDettagliateComponent,
    SingUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
