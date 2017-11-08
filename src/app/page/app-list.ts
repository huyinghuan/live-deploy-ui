import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';
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
      <td>
        <div class="ui buttons">
          <a class="ui green button">编辑</a>
          <div class="or"></div>
          <button class="ui red button" (click)="del(server.id)">删除</button>
        </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>
`

@Component({
  selector: 'app-list',
  template: template
})
export class AppListPage implements OnInit  {
  serverList:any = []
  private app:any ={
    domain: "",
    port: 80,
    name:""
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  ngOnInit() {
    this.api.get(`/api/nginx`, {}).then((list)=>{this.serverList = list})
  }
  ngOnDestroy() {
  }
  del(id){}
  add(){
    if(this.app.port == 0){
      return 
    }
    this.api.post("/api/nginx", this.app).then((data)=>{
     // this.navRouter.navigate(["api", "category", "start", this.params.start, 'end',this.params.end])
      this.navRouter.navigate(["index","app-config", data["id"]])
    })
  }
}
