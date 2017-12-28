import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent }   from './app.component';
import {HomeComponent} from "./Home/home.component";
import {AboutComponent} from "./About/about.component";

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: AboutComponent }
];

@NgModule({
  imports:      [ BrowserModule,RouterModule.forRoot(appRoutes, { useHash: true }) ],
  declarations: [ AppComponent,HomeComponent,AboutComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
