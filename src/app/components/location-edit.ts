import { Component, Input, EventEmitter } from '@angular/core';

let template:string = 
`
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
    <a *ngIf="!more" (click)="more=true">高级</a>
    <a *ngIf="more" (click)="more=false">收起</a>
  </div>
  <div class="field">
    <div class="ui right floated buttons">
      <button class="ui green button" (click)="SaveLoction()">保存</button>
      <div class="or"></div>
      <button class="ui gray button" (click)="CancelEditLocation()">取消</button>
    </div>
  </div>
</div>
<div class="inline fields" *ngIf="more">
  <div class="fourteen wide field">
    <textarea width="100%"  [(ngModel)]="location.more" ></textarea>
  </div>
  <div class="two wide field">
    <button class="ui blue button" (click)="SaveLoction()">保存</button>
  </div>
</div>
</div>
`

@Component({
  selector: '[location-edit]',
  template: template,
  outputs: ['onCancelEditLocation', 'onSaveLocation']
})
export class LocationConfigEditComponent {
  @Input() public location:any;
  public onCancelEditLocation = new EventEmitter()
  public onSaveLocation = new EventEmitter()
  private more:boolean = false
  constructor(){}
  SaveLoction(){
    this.onSaveLocation.emit(this.location)
  }
  CancelEditLocation(){
    this.onCancelEditLocation.emit()
  }

}
