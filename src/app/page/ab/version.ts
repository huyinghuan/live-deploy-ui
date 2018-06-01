import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../../services/API';
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
      <div class="two wide field">
        <input type="text" placeholder="域名（可选）" [(ngModel)]="version.serverName">
      </div>
      <div class="wide field">
        <input type="number" placeholder="端口(可选，默认80)"  [(ngModel)]="version.listen">
      </div>
      <div class="two wide field">
        <input type="text" placeholder="别称"  [(ngModel)]="version.name">
      </div>
      <div class="field"><label>分流</label></div>
      <div class="two wide field">
        <select class="ui search dropdown"  [(ngModel)]="version.parameter">
          <option value="remote_addr">IP</option>
          <option value="http_user_agent">UserAgent</option>
        </select>
      </div>
      <div class="three wide field">
        <input type="text" placeholder="根目录"  [(ngModel)]="version.rootPath">
      </div>
      <div class="field">
        <button class="ui blue button" (click)="save()">保存</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <div class="ui form">
  <div class="inline fields">
      <div class="two wide field">
        <input type="text" placeholder="版本" [(ngModel)]="version.tag">
      </div>
      <div class="wide field">
        <input type="number" min=1 max=100 placeholder="比例(1-100)"  [(ngModel)]="version.proportion">
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
    <th>版本</th>
    <th>比例</th>
    <th class="collapsing">操作</th>
  </tr></thead>
  <tbody>
    <tr *ngFor="let version of versionList">
      <td>{{version.tag}}</td>
      <td>{{version.proportion}}</td>
      <td class="collapsing">
      <div class="ui buttons">  
        <button class="ui red icon button" (click)="del(version.id)" title="删除"><i class="trash icon"></i></button>
      </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>
`

@Component({
  selector: 'ab-version',
  template: template
})
export class ABVersionPage implements OnInit  {
  versionList:any = []
  private subscriptParams:ISubscription
  private params:any = {}
  version:any ={
    tag:"",
    proportion: 50,
  }
  loadList(){
    this.api.get("machine.ab.version", this.params).then((list)=>{this.versionList = list})
  }
  loadProject(){
    this.api.get("machine.ab", this.params).then((data)=>{
      this.version = data
    })
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
   this.loadList()
   this.loadProject()
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {this.subscriptParams.unsubscribe()}
  del(id){
    this.api.remove("machine.ab.version", Object.assign({}, this.params, {version:id})).then(()=>{
      this.loadList()
    })
  }
  add(){
    this.api.post("machine.ab.version", this.params, this.version).then((data)=>{
      // this.navRouter.navigate(["api", "category", "start", this.params.start, 'end',this.params.end])
      //this.navRouter.navigate(["index","app-config", data["id"]])
      //this.navRouter.navigate([ data["id"]], {relativeTo: this.route})
      this.loadList()
      let overage = 100 - this.version.proportion
      this.version ={
        tag:"",
        proportion: overage,
      }
    })
  }
}
