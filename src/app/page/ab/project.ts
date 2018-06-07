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
      <div class="three wide field">
        <input type="text" placeholder="根目录"  [(ngModel)]="ab.rootPath">
      </div>
      <div class="field">
        <button class="ui green icon button" (click)="loadDomain()"><i class="save icon"></i>保存</button>
        <button class="ui blue icon button" (click)="deploy()"><i class="paper plane icon"></i>部署</button>
        <button  *ngIf="ab.status == 1" class="ui red icon button" (click)="unDeploy()"><i class="stop icon"></i>禁用</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <div class="ui form">
  <div class="inline fields">
      <div class="two wide field">
        <input type="text" placeholder="项目名称" [(ngModel)]="project.name">
      </div>
      <div class="field"><label>分流</label></div>
      <div class="two wide field">
        <select class="ui search dropdown"  [(ngModel)]="project.parameter">
          <option value="remote_addr">IP</option>
          <option value="http_user_agent">UserAgent</option>
        </select>
      </div>
      <div class="field">
        <button class="ui blue icon button" (click)="addProject()"><i class="plus icon"></i>添加</button>
      </div>
  </div>
  </div>
  <div class="ui divider"></div>
  <ab-project-config *ngFor="let project of projectList" [project]="project" (onLoadProjectListEvent)="loadProjectList($event)"></ab-project-config>
</div>
`

@Component({
  selector: 'ab-version',
  template: template
})
export class ABProjectPage implements OnInit  {
  projectList:any = []
  private subscriptParams:ISubscription
  private params:any = {}
  ab:any = {}
  project:any = {
    parameter:"remote_addr",
  }
  loadDomain(){
    this.api.get("machine.ab", this.params).then((data)=>{
      this.ab = data
    })
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
   this.loadProjectList()
   this.loadDomain()
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {this.subscriptParams.unsubscribe()}

  clearFrom(){
    this.project =  {
      parameter:"remote_addr",
    }
  }

  loadProjectList(){
    return this.api.get("machine.ab.project", this.params).then((list:any)=>{
      this.projectList = list 
    })
  }
  addProject(){
    this.api.post("machine.ab.project", this.params, this.project).then(()=>{
      this.loadProjectList()
      this.clearFrom()
    })
  }
  deploy(){
    this.api.post("machine.ab.deploy", this.params, {status:1})
  }
  unDeploy(){
    this.api.post("machine.ab.deploy", this.params, {status:0})
  }
  saveDomain(){
    this.api.put("machine.ab", this.params, this.ab)
  }
}
