import { Component, OnInit,ElementRef } from '@angular/core';
import { API } from '../services/API';
import { Observable} from 'rxjs/Observable';
import {ISubscription} from 'rxjs/Subscription'
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import  * as alertjs from 'alertify.js'
declare var jQuery:any
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
          <div class="ui buttons">
            <button class="ui icon blue button" (click)="saveApp()"><i class="save icon"></i>保存</button>
            <button class="ui icon green button" (click)="preview()"><i class="unhide icon"></i>预览</button>
            <button class="ui icon yellow button" (click)="apply()"><i class="rocket icon"></i>应用</button>
          </div>
        </div>
        <div class="field">
          <button class="ui icon green button" (click)="previewRunnig()"><i class="unhide icon"></i>当前运行配置</button>
        </div>
      </div>
    </div>
    <div class="ui divider"></div>
    <div style="margin-left:30px;">
      <h3>负载均衡</h3>
      <div class="ui form">
        <div class="inline fields">
          <div class="field"><label>路径映射</label></div>
          <div class="three wide field">
            <input type="text" placeholder="路径" [(ngModel)]="newLoction.path">
          </div>
          <div class="field"><label>超时</label></div>
          <div class="three wide field">
            <input type="number" placeholder="可选，默认0秒则采用nginx默认值" [(ngModel)]="newLoction.timeout">
          </div>
          <div class="field">
            <button class="ui blue button" (click)="addLoction()">添加</button>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
      <location-config *ngFor="let location of locationList" [location]="location" (onLoctionDelete)="refreshLocationList($event)"></location-config>
      </div>
    </div>
    <div class="ui modal" id="nginx-config-preview">
      <div class="header">Nginx Config</div>
      <div class="content">
        <pre></pre>
      </div>
      <div class="actions">
        <button class="ui black deny button">确定</button>
      </div>
    </div>
`

@Component({
  selector: 'app-config-edit',
  template: template
})
export class AppConfigEditPage implements OnInit  {
  app:any ={
    domain: "",
    port: 80,
    name:""
  }
  private params:any = {}
  locationList:any = []
  newLoction:any={}
  private subscriptQueryParams:ISubscription
  private subscriptParams:ISubscription
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
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
  ngOnDestroy() {
    this.subscriptQueryParams.unsubscribe()
    this.subscriptParams.unsubscribe()
  }
  ngAfterViewInit(){}
  saveApp(){
    this.api.update(`/api/nginx/${this.params.appId}`, this.app).then((app)=>{this.app = app})
  }
  addLoction(){
    this.api.post(`/api/nginx/${this.params.appId}/location`, this.newLoction).then(()=>{
      this.newLoction = {}
      this.api.get(`/api/nginx/${this.params.appId}/location`, {}).then((list)=>{this.locationList = list})
    })
  }
  refreshLocationList(e){
    this.api.get(`/api/nginx/${this.params.appId}/location`, {}).then((list)=>{this.locationList = list})
  }
  preview(){
    this.api.get(`/api/nginx/${this.params.appId}/preview`, {}).then((data)=>{
      jQuery("#nginx-config-preview").find("pre").text(data)
      jQuery("#nginx-config-preview").modal('show')
    })
  }
  previewRunnig(){
    this.api.get(`/api/nginx/${this.params.appId}/running`, {}).then((data)=>{
      jQuery("#nginx-config-preview").find("pre").text(data)
      jQuery("#nginx-config-preview").modal('show')
    })
  }
  apply(){
    if(this.app.down){
      alertjs.confirm("当前服务处于下线状态，是否上线并部署", ()=> {
        this.api.get(`/api/nginx/${this.params.appId}/deploy`, {}).then((msg)=>{
          alertjs.success(msg)
        })
      });
    }else{
      this.api.get(`/api/nginx/${this.params.appId}/deploy`, {}).then((msg)=>{
        alertjs.success(msg)
      })
    }
  }
}
