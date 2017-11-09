import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import {HttpModule} from '@angular/http'
import { FormsModule }   from '@angular/forms'; 

import { AppComponent } from './components/app';
import {LocationConfigComponent} from './components/location'
import {ServerConfigComponent} from './components/server'
import {LocationConfigEditComponent} from './components/location-edit'
import {ServerConfigEditComponent} from './components/server-edit'
import {LeftNavComponent} from './components/left-nav';
import { IndexPage } from './page/index';
import { LoginPage } from './page/login';
import {AppListPage} from './page/app-list';
import {AppConfigAddPage} from './page/app-config-add';
import {AppConfigEditPage} from './page/app-config-edit';
//====== 二层页面

import { API } from './services/API';
import { Page404 } from './page/page-404';

var router = RouterModule.forRoot([
  {path: "", redirectTo:"/index/app-config", pathMatch:"full"},
  {path: 'login',component: LoginPage},
  { path: "index",
    component: IndexPage,
    children:[
      {
        path:"app-config", component: AppListPage
      },
      {
        path:"app-config/:appId", component: AppConfigEditPage
      }
    ]
  },
  {path: '404', component: Page404},
  {path: '**', redirectTo: '/404'}
])

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    LoginPage,
    Page404,
    IndexPage,
    AppListPage,
    AppConfigAddPage,
    AppConfigEditPage,
    ServerConfigComponent,
    ServerConfigEditComponent,
    LocationConfigComponent,
    LocationConfigEditComponent
  ],
  imports: [
    BrowserModule , HttpModule, FormsModule, router
  ],
  providers: [API],
  bootstrap: [AppComponent]
})
export class AppModule { }
