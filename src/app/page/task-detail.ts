import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as alertjs from 'alertify.js';
import { root } from 'postcss';
import { Params } from '@angular/router/src/shared';

declare var jQuery:any
let template:string = 
`
<div class="main-one">
  <div class="ui segment">
    <h4>机器:{{task.machine_name}}</h4>
    <h4>任务类型</h4>
    <p>{{task.type}}:{{task.action}}</p>
    <h4>任务时间 </h4>
    <p>开始:<span>{{formatTime(task.create_time)}}</span> 完成:<span>{{formatTime(task.finish_time)}}</span></p>
    <h4>执行结果 {{getStatus(task.status)}}</h4>
    <pre>{{task.result}}</pre>
    <h4>任务内容</h4>
    <div class="ui grey inverted segment">
    <pre>{{task.content}}</pre>
    </div>
  </div>
</div>
`

@Component({
  selector: 'task-list',
  template: template
})
export class TaskDetails implements OnInit  {
  private subscriptParams
  task:any = {}
  loadData(){
    this.api.get("task", this.params).then((data)=>{
      this.task = data
    })
  }
  private params:any = {}
  constructor(private api:API,private route:ActivatedRoute){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = Object.assign({}, params)
      this.loadData()
    })
  }
  
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
  
  ngOnDestroy() {this.subscriptParams.unsubscribe();}
}
