import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';
import { Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription'
import { ActivatedRoute, ParamMap, Router} from '@angular/router';

let template:string = 
`
  <div class="main">
    <div class="ui form">
      <div class="inline fields">
        <div class="field"><label>应用</label></div>
        <div class="three wide field">
          <input type="text" placeholder="域名（可选）" [(ngModel)]="app.domain">
        </div>
        <div class="three wide field">
          <input type="number" placeholder="端口(可选，默认80)"  [(ngModel)]="app.port">
        </div>
        <div class="three wide field">
          <input type="text" placeholder="别称(可选，数字字母组合)"  [(ngModel)]="app.name">
        </div>
        <div class="field">
          <button class="ui blue button" (click)="saveApp()">保存</button>
        </div>
      </div>
    </div>
    <div class="ui divider"></div>
    <div class="ui form">
      <div class="inline fields">
        <div class="field"><label>负载均衡</label></div>
    </div>
  </div>
`

@Component({
  selector: 'server-config',
  template: template
})
export class AppConfigEditPage implements OnInit  {
  private app:any ={
    domain: "",
    port: 80,
    name:""
  }
  private params:any = {}
  locationList:any = []
  private subscriptQueryParams:ISubscription
  private subscriptParams:ISubscription
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  ngOnInit() {
    this.subscriptQueryParams = this.route.queryParams.subscribe((params)=>{
        Object.assign(this.params, params)
    })
    this.subscriptParams = this.route.params.subscribe((params)=>{
        Object.assign(this.params, params)
    })
    this.api.get(`/api/nginx/${this.params.appId}/location`, {}).then((list)=>{this.locationList = list})
    this.api.get(`/api/nginx/${this.params.appId}`, {}).then((app)=>{this.app = app})
  }
  saveApp(){
    this.api.update(`/api/nginx/${this.params.appId}`, this.app).then((app)=>{this.app = app})
  }
}
