import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { PostAttiviComponent } from './components/post-attivi/post-attivi.component';
import { PostNonAttiviComponent } from './components/post-non-attivi/post-non-attivi.component';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomepageComponent } from './components/homepage/homepage.component';
const routes: Route[] = [
    {
        path: '',
        component: HomepageComponent
    },
    {
        path: 'primo',
        component:PostAttiviComponent
    },
    {
        path: 'secondo',
        component: PostNonAttiviComponent
    },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PostAttiviComponent,
    PostNonAttiviComponent,
    NavBarComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
