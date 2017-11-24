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
import {NginxListPage} from './page/nginx-list';
import {NginxConfigEditPage} from './page/nginx-config-edit';
//====== 二层页面

import { API } from './services/API';
import { Page404 } from './page/page-404';

import  * as alertjs from 'alertify.js'
import { TopNavComponent } from './components/top-nav';
import { MachineListPage } from './page/machine';
import { MachinePanelPage } from './page/machine-panel';
alertjs.logPosition("bottom right").maxLogItems(5).delay(10000).okBtn("确认").cancelBtn("取消").setLogTemplate(function(input){
  let q = [];
  (input as string).split('\n').forEach((item)=>{
    q.push(`<p>${item}</p>`)
  })
  return q.join('')
});


var router = RouterModule.forRoot([
  {path: "", redirectTo:"/index/machine", pathMatch:"full"},
  {path: 'login',component: LoginPage},
  { path: "index",
    component: IndexPage,
    children:[
      {
        path: "machine", component: MachineListPage
      },
      {
        path: "machine/:machine", component: MachinePanelPage
      },
      {
        path:"machine/:machine/nginx", component: NginxListPage
      },
      {
        path:"machine/:machine/nginx/:nginx", component: NginxConfigEditPage
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
    TopNavComponent,
    LoginPage,
    Page404,
    IndexPage,
    MachineListPage,
    MachinePanelPage,
    NginxListPage,
    NginxConfigEditPage,
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
