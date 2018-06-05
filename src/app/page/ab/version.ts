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
        <input type="text" placeholder="域名（可选）" [(ngModel)]="ab.serverName">
      </div>
      <div class="wide field">
        <input type="number" placeholder="端口(可选，默认80)"  [(ngModel)]="ab.listen">
      </div>
      <div class="two wide field">
        <input type="text" placeholder="别称"  [(ngModel)]="ab.name">
      </div>
      <div class="field"><label>分流</label></div>
      <div class="two wide field">
        <select class="ui search dropdown"  [(ngModel)]="ab.parameter">
          <option value="remote_addr">IP</option>
          <option value="http_user_agent">UserAgent</option>
        </select>
      </div>
      <div class="three wide field">
        <input type="text" placeholder="根目录"  [(ngModel)]="ab.rootPath">
      </div>
      <div class="field">
        <button class="ui green icon button" (click)="save()"><i class="save icon"></i>保存</button>

        <button  *ngIf="ab.status == 0" class="ui blue icon button" (click)="deploy()"><i class="paper plane icon"></i>部署</button>
        <button  *ngIf="ab.status == 1" class="ui red icon button" (click)="unDeploy()"><i class="stop icon"></i>禁用</button>
        <button  *ngIf="ab.status == -1" class="ui red icon button" (click)="deploy()"><i class="stop icon"></i>部署中...</button>
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
        <button class="ui blue icon button" (click)="add()"><i class="plus icon"></i>添加</button>
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
  ab:any = {}
  version:any ={
    tag:"",
    proportion: 50,
  }
  loadList(){
    return this.api.get("machine.ab.version", this.params).then((list:any)=>{
      this.versionList = list
      let currentProportion = 0
      list.forEach(element => {
        currentProportion = currentProportion + element.proportion
      });
      let overage = 100 - currentProportion
      if(overage == 100){
        overage = 50
      }
      this.version ={
        tag:"",
        proportion: overage,
      }
    })
  }
  loadProject(){
    this.api.get("machine.ab", this.params).then((data)=>{
      this.ab = data
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
      this.loadList()
    })
  }
  deploy(){
    this.api.post("machine.ab.deploy", this.params, {status:1})
  }
  unDeploy(){
    this.api.post("machine.ab.deploy", this.params, {status:0})
  }
  save(){
    this.api.put("machine.ab", this.params, this.ab)
  }
}
