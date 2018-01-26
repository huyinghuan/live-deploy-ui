import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription'
let template:string = 
`
<div style="margin-left:30px;margin-right:30px;">
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th colspan="5">
          <a class="ui tag label" title="路径">{{location.path}}</a>
          <a class="ui teal tag label" title="超时">timeout: {{location.timeout}}s</a>
          <div class="ui right floated buttons">            
            <button class="ui icon red button" (click)="delLocation(location.id)" title="删除"><i class="trash icon"></i></button>
            <button class="ui icon blue button" (click)="locationEditing=true" title=“编辑”><i class="edit icon"></i></button>
            <button class="mini ui green button"  (click)="doAddServer()" title="添加服务器"><i class="desktop icon"></i></button>
          </div>
        </th>
      </tr>
      <tr>
        <th colspan="5" location-edit  *ngIf="locationEditing"  (onCancelEditLocation)="locationEditing=false" (onSaveLocation)="SaveLoction($event)" [location]="location"></th>
      </tr>
      <tr [style.display]="serverAdding ? 'table-row' : 'none'">
        <th colspan="5" server-edit (onCancelAddServer)="serverAdding=false" (onSaveServer)="SaveServer()" [server]="server"></th>
      </tr>
    </thead>
    <thead>
      <tr><th>Server IP</th><th class="collapsing">超时</th><th>主从</th><th>状态</th><th>操作</th></tr>
    </thead>
    <tbody>
      <tr server-config *ngFor="let server of serverList" [server]="server" (onEditServer)="doEditServer($event)" (onDeleteServer)="delServer($event)" (onUpdateServerStatus)="updateServerStatus($event)"></tr>
    </tbody>
  </table>
  <div class="ui divider"></div>
</div>
`

@Component({
  selector: 'location-config',
  template: template,
  outputs: ['onLoctionDelete']
})
export class LocationConfigComponent implements OnInit  {
  @Input() public location:any;
  public onLoctionDelete = new EventEmitter()
  locationEditBtn = false
  locationEditing = false
  serverAdding = false
  serverList:any=[]
  server:any = {}
  enter = false
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  loadList(){
    this.api.get("machine.nginx.location.server", Object.assign({location:this.location.id}, this.params)).then((data)=>{
      this.serverList = data
    })
  }
  showLocationEditBtn(enter){
    this.enter = enter
    if(enter){
      setTimeout(()=>{
        if(this.enter){
          this.locationEditBtn=true
        }
      }, 500)
    }else{
      this.locationEditBtn=false
    }
  }
  private subscriptParams:ISubscription
  private params:any = {}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
    this.loadList()
  }
  ngOnDestroy() {
    this.subscriptParams.unsubscribe()
  }
  delLocation(id){
    this.api.remove("machine.nginx.location",Object.assign({location:this.location.id}, this.params)).then(()=>{
     //通知父级刷新列表
     this.onLoctionDelete.emit({id:1})
    })
  }
  SaveLoction(location){
    this.api.put("machine.nginx.location", Object.assign({location:this.location.id}, this.params), location).then((data)=>{
      this.location = data
      this.locationEditing = false
    })
  }
  SaveServer(){
    let url  = `machine.nginx.location.server`
    let method = "POST"
    let urlParams = {location:this.location.id}
    if(this.server.id){
      urlParams["server"] = this.server.id
      method ="PUT"
    }
    this.api.all(method, url, Object.assign(urlParams, this.params), this.server).then((data)=>{
      this.serverAdding = false
      this.loadList()
    })
  }
  doEditServer(server){
    this.server = server
    this.serverAdding = true
  }
  doAddServer(){
    this.server = {}
    this.serverAdding=true
  }
  delServer(id){
    this.api.remove(`machine.nginx.location.server`, Object.assign( {location:this.location.id, server:id}, this.params)).then(()=>{
      this.loadList()
    })
  }
  updateServerStatus(data:any){
    this.api.update("machine.nginx.location.server",Object.assign( {location:this.location.id, server:data["id"]}, this.params), data).then(()=>{
      this.loadList()
    })
  }
}
