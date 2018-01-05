import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { Router, NavigationEnd } from '@angular/router';
declare var jQuery:any
import * as alertjs from 'alertify.js';
let template:string = `
  <div class="ui large breadcrumb" style="margin-top:10px; margin-left:20px;">
    <a class="section" [routerLink]="['/index/machine']" >首页</a>
    <div style="display:inline" top-nav-item *ngFor="let item of itemList; last as isLast" [navItem]="item" [isLast]="isLast" ></div>
  </div>
  <div class="right menu">
    <a class="item">{{username}}</a>
    <a class="item"(click)="logout()">注销</a>
    <a class="item" id="message_notity">
      <i class="announcement icon"></i>
      <div *ngIf="page.total" class=" ui red label">{{page.total}}</div>
    </a>
    <div class="ui fluid popup bottom right transition hidden" >
      <span *ngIf="messageList.length == 0">暂无消息</span>
      <div  *ngIf="messageList.length" class="ui aligned divided list" style="width:300px!important">
        <div  *ngFor="let message of messageList" class="item">
          <i *ngIf="message.status" class="green check circle outline icon"></i>
          <i *ngIf="!message.status" class="red remove circle outline icon"></i>
          <div class="content">
              <span>{{message.name}}</span><span>{{message.type}}</span><span>{{message.action}}</span>
          </div>
          <span style="font-size: 8px;">{{message.finish_time * 1000 | date:"yyyy-MM-dd HH:mm:ss"}}</span>
          <a class="right floated content" (click)="hasRead(message.id)">已读</a>
          <a class="right floated content" [routerLink]="['task', message.task_id]">详细</a>
        </div>
      </div>
    </div>
  </div>
`

@Component({
  selector: '[top-nav]',
  template: template
})
export class TopNavComponent implements OnInit{
  username = "未登录"
  itemList:any = []
  messageList:any = []
  timer:any = null
  private menuNameMap = {"machine":"服务器列表", "nginx":"nginx列表", "task":"任务列表"}
  private ignoreMap = {
    "task":true
  }
  private page:any ={
    total:0
  }
  constructor(private api:API, private route:Router, private ele:ElementRef){
    this.route.events.subscribe((e)=>{
      if(e.constructor.name != "NavigationEnd"){
        return
      }
      let url = (e as NavigationEnd).url.split("?").shift()
      let tempList = []
      let arr = url.split('/')
      arr = arr.slice(2);
      var currentUrl = []
      for(let i = 0; i < arr.length; i = i+2){
        currentUrl.push(arr[i])
        let item:any= {
          label:this.menuNameMap[arr[i]],
          url: [].concat(currentUrl)
        }

        if(arr[i+1]){
          if(this.ignoreMap[arr[i]]){
            item.value = arr[i+1]
            item.name = 'no-get-from-remote'
          }else{
            currentUrl.push(arr[i+1])
            item.value = arr[i+1]
            item.name = 'loading'
          }
        }
        tempList.push(item)
      }
      this.itemList = tempList
    })
    this.timer = setInterval(()=>{
      this.getNewMessageCount()
    }, 10 * 1000)
  }
  loadMessage(){
    this.api.get("task.log.latest").then((data)=>{
      this.messageList = data
    })
  }
  ngOnInit(){
    this.getNewMessageCount()
    this.api.get("session").then((data)=>{
      this.username = (data as any).name
    })
  }
  hasRead(id){
    this.api.put("task.log.status.read", {log: id}).then(()=>{
      this.loadMessage()
      this.getNewMessageCount()
    })
  }
  getNewMessageCount(){
    this.api.get("task.log.unread.count").then((data:any)=>{
      this.page = data
    })
  }
  ngAfterViewInit(){
    jQuery(this.ele.nativeElement).find('#message_notity').popup({
      inline     : true,
      hoverable  : true,
      position   : 'bottom left',
      delay: {
        show: 300,
        hide: 800
      },
      onVisible: ()=>{
        this.loadMessage()
      }
    })  
  }
  ngOnDestroy(){
    if(this.timer){
      clearInterval(this.timer)
    }
  }

  logout(){
    this.api.remove("session")
  }
}
