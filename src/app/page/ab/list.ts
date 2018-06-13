import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as alertjs from 'alertify.js';
import { root } from 'postcss';
declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="field"><label>应用</label></div>
      <div class="two wide field">
        <input type="text" placeholder="域名（可选）" [(ngModel)]="ab.serverName">
      </div>
      <div class="wide field">
        <input type="number" placeholder="端口(可选，默认80)"  [(ngModel)]="ab.listen">
      </div>
      <div class="two wide field">
        <input type="text" placeholder="别称"  [(ngModel)]="ab.name">
      </div>
      <div class="three wide field">
        <input type="text" placeholder="根目录"  [(ngModel)]="ab.rootPath">
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
    <th class="collapsing">状态</th>
    <th class="collapsing">应用名称</th>
    <th>域名</th>
    <th class="collapsing">端口</th>
    <th>根目录</th>
    <th>操作</th>
  </tr></thead>
  <tbody>
    <tr *ngFor="let server of abList">
      <td class="collapsing">
        <i class="gray heartbeat icon"  *ngIf="server.status == 0"></i>
        <i class="red heartbeat icon"  *ngIf="server.status == 1"></i>
      </td>
      <td class="collapsing"><a [routerLink]="[server.id]">{{server.name}}</a></td>
      <td><a [routerLink]="[server.id]">{{server.serverName}}</a></td>
      <td class="collapsing">{{server.listen}}</td>
      <td>{{server.rootPath}}</td>
      <td class="collapsing">
        <div class="ui buttons">
          <a class="ui green icon button" title="编辑" [routerLink]="[server.id]"><i class="edit icon"></i></a>
          <button class="ui red icon button" (click)="del(server.id)" title="删除"><i class="trash icon"></i></button>
          <button *ngIf="server.status == 1" class="ui yellow icon button" (click)="down(server.id)" title="下线" ><i class="arrow circle down icon"></i></button>
          <button *ngIf="server.status == 0" class="ui blue icon button" (click)="up(server.id)" title="上线" ><i class="arrow circle up icon"></i></button>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>
`

@Component({
  selector: 'ab-list',
  template: template
})
export class ABListPage implements OnInit  {
  abList:any = []
  private subscriptParams
  private params:any = {}
  ab:any ={
    server_name: "",
    listen: 80,
    root_path:"",
    name: ""
  }
  loadList(){
    this.api.get("machine.ab", this.params).then((list)=>{this.abList = list})
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
    this.api.remove("machine.ab", Object.assign({}, this.params, {ab:id})).then(()=>{
      this.loadList()
    })
  }
  add(){
    if(this.ab.listen == 0){
      return 
    }
    this.api.post("machine.ab", this.params, this.ab).then((data)=>{
     // this.navRouter.navigate(["api", "category", "start", this.params.start, 'end',this.params.end])
      //this.navRouter.navigate(["index","app-config", data["id"]])
      //this.navRouter.navigate([ data["id"]], {relativeTo: this.route})
      this.loadList()
    })
  }
  down(id){
    this.api.put("machine.ab.deploy", Object.assign({}, this.params, {ab:id}), {status: 0}).then(()=>{
      this.loadList()
    })
  }
  up(id){
    this.api.put("machine.ab.deploy", Object.assign({}, this.params, {ab:id}),  {status: 1}).then(()=>{
      this.loadList()
    })
  }
}
