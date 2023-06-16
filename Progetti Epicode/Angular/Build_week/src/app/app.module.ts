import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HomePageComponent } from './component/home-page/home-page.component';
import { AuthGuard } from './auth/login/auth.guard';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ModifyPostComponent } from './component/modify-post/modify-post.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';


const routes: Routes = [

  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home-page',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modify-post/:id',
    component: ModifyPostComponent,
    canActivate: [AuthGuard]
  }
  ];




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    ModifyPostComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
