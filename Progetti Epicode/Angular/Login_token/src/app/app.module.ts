import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const routes: Route[] =

    [

        {
            path: '',
            component: HomeComponent
        },

        {
            path: 'prodotti',
            component: ProductComponent
        },
        {

            path: 'login',
            component: LoginComponent
        },


        {
            path: 'register',
            component: RegisterComponent
        }

]





@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProductComponent,
        LoginComponent,
        RegisterComponent,
        NavBarComponent,

    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
