import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
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
      <div class="field"><label>机器</label></div>
      <div class="three wide field">
        <input type="text" placeholder="机器名" [(ngModel)]="filer.machineName">
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <table class="ui celled padded table">
  <thead>
    <tr>
      <th>任务类型</th>
      <th>任务动作</th>
      <th>状态</th>
      <th>创建时间</th>
      <th>完成时间</th>
      <th>更多</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let log of logList">
    </tr>
  </tbody>
  </table>
</div>
`

@Component({
  selector: 'log-list',
  template: template
})
export class LogListPage implements OnInit  {
  serverList:any = []
  private subscriptParams:ISubscription
  private params:any = {}
  filer:any ={
    machine:""
  }
  loadList(){
    this.api.get("log", this.params).then((list)=>{this.serverList = list})
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
   //this.loadList()
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {this.subscriptParams.unsubscribe()}
}
