import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { Router, NavigationEnd } from '@angular/router';
declare var jQuery:any
let template:string = `
  <div class="ui large breadcrumb" style="margin-top:10px; margin-left:20px;">
    <a class="section" [routerLink]="['/index/machine']" >首页</a>
    <div style="display:inline" top-nav-item *ngFor="let item of itemList; last as isLast" [navItem]="item" [isLast]="isLast" ></div>
  </div>
  <div class="right menu">
    <a class="item">{{username}}</a>
    <a class="item"(click)="logout()">注销</a>
    <a class="item" id="message_notity"><i class="alarm icon" [ngClass]="{'red': hasNewMessage}"></i>消息</a>
    <div class="ui fluid popup bottom right transition hidden">
      <ul>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
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
  hasNewMessage:boolean = false
  private menuNameMap = {"machine":"服务器列表", "nginx":"nginx列表", "task":"任务列表"}
  private ignoreMap = {
    "task":true
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
  }
  ngOnInit(){
    this.api.get("session").then((data)=>{
      this.username = (data as any).name
    })
    this.api.get("task.log.latest", (data)=>{
      console.log(data)
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
      }
    })  
  }
  
  logout(){
    this.api.remove("session")
  }
}
