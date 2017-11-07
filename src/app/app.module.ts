import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import {HttpModule} from '@angular/http'
import { FormsModule }   from '@angular/forms'; 

import { AppComponent } from './components/app';
import {LocationConfigComponent} from './components/location'
import {ServerConfigComponent} from './components/server'


import { IndexPage } from './page/index';
import { LoginPage } from './page/login';
import {AppListPage} from './page/app-list';
import {AppConfigAddPage} from './page/app-config-add';
import {AppConfigEditPage} from './page/app-config-edit';
//====== 二层页面

import { API } from './services/API';

var router = RouterModule.forRoot([
  {path: "", redirectTo:"/index/app-config", pathMatch:"full"},
  {path: 'login',component: LoginPage},
  { path: "index",
    component: IndexPage,
    children:[
      {
        path:"", component: AppListPage
      },
      {
        path:"app-config", component: AppConfigAddPage
      },
      {
        path:"app-config/:appId", component: AppConfigEditPage
      }
    ]
  }
])

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    IndexPage,
    AppListPage,
    AppConfigAddPage,
    AppConfigEditPage,
    ServerConfigComponent,
    LocationConfigComponent
  ],
  imports: [
    BrowserModule , HttpModule, FormsModule, router
  ],
  providers: [API],
  bootstrap: [AppComponent]
})
export class AppModule { }
