import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';

let template:string = 
`
<div style="margin-left:30px;margin-right:30px;">
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th colspan="5" (mouseenter)="locationEditBtn=true" (mouseleave)="locationEditBtn=false" *ngIf="!locationEditing">
          <a class="ui tag label" title="路径">{{location.path}}</a>
          <a class="ui teal tag label" title="超时">timeout: {{location.timeout}}s</a>
          <div class="ui right floated buttons" [style.display]="locationEditBtn ? 'inline-flex' : 'none'">
            <button class="mini ui red button"  (click)="delLocation(location.id)">删除</button>
            <div class="or"></div>
            <button class="mini ui blue button"  (click)="locationEditing=true">编辑</button>
            <div class="or"></div>
            <button class="mini ui green button"  (click)="doAddServer()">添加服务器</button>
          </div>
        </th>
      </tr>
      <tr>
        <th colspan="5" location-config  *ngIf="locationEditing"  (onCancelEditLocation)="locationEditing=false" (onSaveLocation)="SaveLoction($event)" [attr.location]="location"></th>
      </tr>
      <tr [style.display]="serverAdding ? 'table-row' : 'none'">
        <th colspan="5" server-edit (onCancelAddServer)="serverAdding=false" (onSaveServer)="SaveServer($event)" [server]="server"></th>
      </tr>
    </thead>
    <thead>
      <tr><th>Server IP</th><th>超时</th><th>备用</th><th>状态</th><th>操作</th></tr>
    </thead>
    <tbody>
      <tr server-config *ngFor="let server of serverList" [server]="server" (onEditServer)="doEditServer($event)" (onDeleteServer)="delServer($event)"></tr>
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
  private appid:number
  private sub:any
  server:any = {}
  name = "11"
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  loadList(){
    this.api.get(`/api/nginx/${this.appid}/location/${this.location.id}/server`,{}).then((data)=>{
      this.serverList = data
    })
  }
  ngOnInit() {
    setTimeout(()=>{
      this.name= "2222"
    }, 3000)
    this.sub = this.route.params.subscribe((params)=>{this.appid = +params["appId"]})
    this.loadList()
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
  }
  delLocation(id){
    this.api.remove(`/api/nginx/${this.appid}/location/${this.location.id}`).then(()=>{
     //通知父级刷新列表
     this.onLoctionDelete.emit({id:1})
    })
  }
  SaveLoction(location){
    this.api.put(`/api/nginx/${this.appid}/location/${this.location.id}`, location).then((data)=>{
      this.location = data
      this.locationEditing = false
    })
  }
  SaveServer(){
    let url  = `/api/nginx/${this.appid}/location/${this.location.id}/server`
    let method = "POST"
    if(this.server.id){
      url = `${url}/${this.server.id}`
      method ="PUT"
    }
    this.api.all(method,url, this.server).then((data)=>{
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
    this.api.remove(`/api/nginx/${this.appid}/location/${this.location.id}/server/${id}`).then(()=>{
      this.loadList()
    })
  }
}
