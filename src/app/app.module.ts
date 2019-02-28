import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent }   from './app.component';
import {HomeComponent} from "./Home/home.component";
import {AboutComponent} from "./About/about.component";
import { CommonModule } from '@angular/common';
import { APIService } from './app.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: AboutComponent }
];

@NgModule({
  imports:      [ BrowserModule,FormsModule,ReactiveFormsModule ,CommonModule,HttpClientModule,RouterModule.forRoot(appRoutes, { useHash: true }) ],
  declarations: [ AppComponent,HomeComponent,AboutComponent ],
  providers: [
    APIService
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
