import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as alertjs from 'alertify.js';

declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="data-form">
    <div class="ui form">
      <div class="inline fields">
        <div class="field"><label>机器</label></div>
        <div class="field">
          <input type="text" placeholder="机器名" [(ngModel)]="filterParams.machine_name">
        </div>
        <div class="field">
          <input type="text" placeholder="任务类型" [(ngModel)]="filterParams.task_type">
        </div>
        <div class="field">
          <input type="text" placeholder="任务动作" [(ngModel)]="filterParams.task_action">
        </div>
        <div class="field">
          <select class="ui search dropdown"  [(ngModel)]="filterParams.task_status" (ngModelChange)="filter()">
            <option value=-3>全部</option>
            <option value=2>成功</option>
            <option value=1>待完成</option>
            <option value=0>待下发</option>
            <option value=-1>失败</option>
          </select>
        </div>
        <div class="field">
          <button class="ui icon green button" (click)="filter()"><i class="filter icon"></i>过滤</button>
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
          <th class="collapsing">完成时间</th>
          <th>更多</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let task of taskList">
          <td class="collapsing">{{task.machine_name}}</td>
          <td class="collapsing">{{task.type}}</td>
          <td class="collapsing">{{task.action}}</td>
          <td class="collapsing">{{getStatus(task.status)}}</td>
          <td class="collapsing">{{getTime(task.create_time) | date: "yyyy-MM-dd HH:mm:ss"}}</td>
          <td class="collapsing">{{formatTime(task.finish_time)}}</td>
          <td  class="collapsing"><a [routerLink]="[task.id]">详细</a></td>
        </tr>
      </tbody>
    </table>
  </div>
  <pagination [pageCount]="pageCount" [pageCurrent]="filterParams.page" (onGoto)="gotoPage($event)"></pagination>
</div>
`

@Component({
  selector: 'task-list',
  template: template
})
export class TaskListPage implements OnInit  {
  taskList:any = []
  public pageCount = 1
  private subscriptQueryParams
  filterParams:any ={
    page: 1,
    task_status: -3
  }
  filter(){
    this.navRouter.navigate(["index","task"], {
      queryParams:Object.assign(this.filterParams, {page: 1})
    })
  }
  loadList(){
    this.api.get("task", {}, this.filterParams).then((data:any)=>{
      this.taskList = data.data
      this.pageCount = data.page
    })
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptQueryParams = this.route.queryParams.subscribe((params)=>{
      this.filterParams = Object.assign({}, this.filterParams, params)
      this.loadList()
      //Object.assign(this.params, params)
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
  formatTime(timeunix){
    if(~~timeunix == 0){
      return "未完成"
    }
    let date = new Date(~~timeunix*1000)
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " "+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() 
  }
  gotoPage(page){
    this.navRouter.navigate(["index","task"], {
      queryParams:Object.assign(this.filterParams,{
        page: page
      })
    })
  }
  ngOnDestroy() {this.subscriptQueryParams.unsubscribe()}
}
