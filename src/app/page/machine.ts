import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as alertjs from 'alertify.js';
declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="field"><label>服务器</label></div>
      <div class="six wide field">
        <input type="text" placeholder="IP地址"  [(ngModel)]="machine.ip">
        <input type="text" placeholder="描述"  [(ngModel)]="machine.name">
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
      <th class="collapsing" data-tooltip="最后一次获取任务到当前时间是否大于5分钟"  data-inverted  data-position="top left">状态?</th>
      <th>IP</th>
      <th>服务器</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let machine of machineList">
      <td>
        <i class="red heartbeat icon"  *ngIf="!machine.status"></i>
        <i class="green heartbeat icon"  *ngIf="machine.status"></i>
      </td>
      <td><a [routerLink]="[machine.md5id]">{{machine.ip}}</a></td>
      <td><a [routerLink]="[machine.md5id]">{{machine.name}}</a></td>

      <td class="collapsing">
      <div class="ui buttons">
        <a class="ui green icon button" title="编辑" [routerLink]="[machine.md5id]"><i class="edit icon"></i></a>
        <button class="ui red icon button" (click)="del(machine.md5id)" title="删除"><i class="trash icon"></i></button>
      </div>
      </td>
    </tr>
  </tbody>
  </table>
</div>
`

@Component({
  selector: 'machine-list',
  template: template
})
export class MachineListPage implements OnInit  {
  machineList:any = []
  machine:any ={
    name:""
  }
  loadList(){
    this.api.get('machine').then((list)=>{this.machineList = list})
  }
  constructor(private api:API, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
   this.loadList()
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {}
  del(id){
    alertjs.confirm("删除应用将导致服务不可能用，是否确认删除？", ()=>{
      this.api.remove("machine", {machine:id}).then((msg)=>{
        alertjs.success(msg)
        this.loadList()
      })
    })
  }
  add(){
    this.api.post("machine", {}, this.machine).then((data)=>{
     // this.navRouter.navigate(["api", "category", "start", this.params.start, 'end',this.params.end])
      this.navRouter.navigate(["index","machine", data["md5id"]])
    })
  }
}
