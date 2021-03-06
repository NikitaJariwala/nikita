import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from "./Home/home.component";
import {AboutComponent} from "./About/about.component";
import {EditcustomerComponent} from "./editcustomer/editcustomer.component";

import {CommonModule} from '@angular/common';
import {APIService} from './app.service';

const appRoutes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: '', component: AboutComponent},
    {path: 'editcustomer/:id', component: EditcustomerComponent}

];

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule,
        CommonModule, HttpClientModule, RouterModule.forRoot(appRoutes, {useHash: true})],
    declarations: [AppComponent, HomeComponent, AboutComponent, EditcustomerComponent],
    providers: [
        APIService
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
