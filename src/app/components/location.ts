import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';

`

`
let template:string = 
`

<div style="margin-left:30px;margin-right:30px;">
  <table class="ui celled striped table">
    <thead>
      <tr>
        <th colspan="3" (mouseenter)="locationEditBtn=true" (mouseleave)="locationEditBtn=false" *ngIf="!locationEditing">
          <a class="ui tag label" title="路径">{{location.path}}</a>
          <a class="ui teal tag label" title="超时">{{location.timeout}}s</a>
          <div class="ui right floated buttons" [style.display]="locationEditBtn ? 'inline-flex' : 'none'">
            <button class="ui blue button"  (click)="locationEditing=true">编辑</button>
            <div class="or"></div>
            <button class="ui red button"  (click)="delLocation(location.id)">删除</button>
          </div>
        </th>
        <th colspan="3"  *ngIf="locationEditing">
          <div class="ui form">
            <div class="inline fields">
              <div class="field"><label>路径映射</label></div>
              <div class="three wide field">
                <input type="text" placeholder="路径" [(ngModel)]="location.path">
              </div>
              <div class="field"><label>超时</label></div>
              <div class="three wide field">
                <input type="number" placeholder="可选，默认0秒为nginx默认值" [(ngModel)]="location.timeout">
              </div>
              <div class="field">
                <div class="ui right floated buttons" [style.display]="locationEditBtn ? 'inline-flex' : 'none'">
                  <button class="ui green button" (click)="SaveLoction()">保存</button>
                  <div class="or"></div>
                  <button class="ui gray button" (click)="locationEditing=false">取消</button>
                </div>
              </div>
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="collapsing">
          <i class="folder icon"></i> node_modules
        </td>
        <td>Initial commit</td>
        <td class="right aligned collapsing">10 hours ago</td>
      </tr>
      <tr>
        <td>
          <i class="folder icon"></i> test
        </td>
        <td>Initial commit</td>
        <td class="right aligned">10 hours ago</td>
      </tr>
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
  private appid:number
  private sub:any
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  ngOnInit() {
    this.sub = this.route.params.subscribe((params)=>{this.appid = +params["appId"]})
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
  SaveLoction(){
    this.api.put(`/api/nginx/${this.appid}/location/${this.location.id}`, this.location).then((data)=>{
      this.location = data
      this.locationEditing = false
    })
  }
}
