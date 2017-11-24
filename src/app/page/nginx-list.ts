import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription'
import * as alertjs from 'alertify.js';
import { root } from 'postcss';
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
        <button class="ui blue button" (click)="add()">添加</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <table class="ui celled padded table">
  <thead>
    <tr>
    <th>应用名称</th>
    <th>域名</th>
    <th>监听端口</th>
    <th>操作</th>
  </tr></thead>
  <tbody>
    <tr *ngFor="let server of serverList">
      <td>{{server.name}}</td>
      <td>{{server.domain}}</td>
      <td>{{server.port}}</td>
      <td class="collapsing">
      <div class="ui buttons">
        <a class="ui green icon button" title="编辑" [routerLink]="[server.id]"><i class="edit icon"></i></a>
        <button class="ui red icon button" (click)="del(server.id)" title="删除"><i class="trash icon"></i></button>
        <button *ngIf="!server.down" class="ui yellow icon button" (click)="down(server.id)" title="下线" ><i class="arrow circle down icon"></i></button>
        <button *ngIf="server.down" class="ui blue icon button" (click)="up(server.id)" title="上线" ><i class="arrow circle up icon"></i></button>
      </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>
`

@Component({
  selector: 'nginx-list',
  template: template
})
export class NginxListPage implements OnInit  {
  serverList:any = []
  private subscriptParams:ISubscription
  private params:any = {}
  app:any ={
    domain: "",
    port: 80,
    name:""
  }
  loadList(){
    this.api.get("machine.nginx", this.params).then((list)=>{this.serverList = list})
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
   this.loadList()
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {this.subscriptParams.unsubscribe()}
  del(id){
    alertjs.confirm("删除应用将导致服务不可能用，是否确认删除？", ()=>{
      this.api.remove("nginx", {nginx:id}).then((msg)=>{
        alertjs.success(msg)
        this.loadList()
      })
    })
  }
  add(){
    if(this.app.port == 0){
      return 
    }
    this.api.post("machine.nginx", this.params, this.app).then((data)=>{
     // this.navRouter.navigate(["api", "category", "start", this.params.start, 'end',this.params.end])
      //this.navRouter.navigate(["index","app-config", data["id"]])
      this.navRouter.navigate([ data["id"]], {relativeTo: this.route})
    })
  }
  down(id){
    alertjs.confirm("下线将导致服务不可能用，是否确认下线？", ()=>{
      this.api.put(`nginx.status`, {nginx:id},{down: true}).then(()=>{
        this.loadList()
      })
    })
  }
  up(id){
    this.api.put("nginx.status",{nginx:id}, {down: false}).then(()=>{
      this.loadList()
    })
  }
}
