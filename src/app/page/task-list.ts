import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription'
import * as alertjs from 'alertify.js';
import { root } from 'postcss';
import { Params } from '@angular/router/src/shared';
import { Page404 } from './page-404';
declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="data-form">
    <div class="ui form">
      <div class="inline fields">
        <div class="field"><label>机器</label></div>
        <div class="three wide field">
          <input type="text" placeholder="机器名" [(ngModel)]="filer.machineName">
        </div>
      </div>
    </div>
    <div class="ui divider"></div>
  </div>
  <div class="data-table">
    <table class="ui celled padded table">
      <thead>
        <tr>
          <th class="collapsing">机器</th>
          <th class="collapsing">任务类型</th>
          <th class="collapsing">任务动作</th>
          <th  class="collapsing">状态</th>
          <th>创建时间</th>
          <th>完成时间</th>
          <th>更多</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let task of taskList">
          <td class="collapsing">{{task.machine_name}}</td>
          <td class="collapsing">{{task.type}}</td>
          <td class="collapsing">{{task.action}}</td>
          <td>{{getStatus(task.status)}}</td>
          <td class="collapsing">{{getTime(task.create_time) | date: "yyyy-MM-dd HH:mm:ss"}}</td>
          <td class="collapsing">{{getTime(task.finish_time) | date: "yyyy-MM-dd HH:mm:ss"}}</td>
          <td>详细</td>
        </tr>
      </tbody>
    </table>
  </div>
  <pagination [pageCount]="pageCount" [pageCurrent]="params.page" (onGoto)="gotoPage($event)"></pagination>
</div>
`

@Component({
  selector: 'task-list',
  template: template
})
export class TaskListPage implements OnInit  {
  taskList:any = []
  public pageCount = 1
  private subscriptParams:ISubscription
  private subscriptQueryParams:ISubscription
  private params:any = {}
  filer:any ={
    machine:""
  }
  loadList(){
    this.api.get("log.status.page", Object.assign({status:2, page:1},this.params)).then((data:any)=>{
      this.taskList = data.data
      this.pageCount = data.page
    })
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      Object.assign(this.params, params)
    })
    this.subscriptQueryParams = this.route.queryParams.subscribe((params)=>{
      this.loadList()
      Object.assign(this.params, params)
    })
    this.route.params.subscribe((params: Params)=>{
      Object.assign(this.params, params)
    })
    
  }
  ngAfterContentChecked(){}
  getStatus(status){
    switch(~~status){
      case -1:
        return "失败"
      case 0:
        return "未下发"
      case 1:
        return "待完成"
      case 2:
        return "成功"
    }
  }
  getTime(timeunix){
    return timeunix * 1000
  }
  gotoPage(page){
    this.navRouter.navigate(["index","task"], {
      queryParams:{
        page: page
      }
    })
  }
  ngOnDestroy() {this.subscriptParams.unsubscribe();this.subscriptQueryParams.unsubscribe()}
}
