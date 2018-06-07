import { Component, Input, EventEmitter } from '@angular/core';

let template:string = 
`
<div class="ui form">
<div class="inline fields">
  <div class="field"><label>项目名称</label></div>
  <div class="three wide field">
    <input type="text" placeholder="项目名称" [(ngModel)]="project.name">
  </div>
  <div class="field"><label>分流</label></div>
  <div class="three wide field">
    <select class="ui search dropdown"  [(ngModel)]="project.parameter">
      <option value="remote_addr">IP</option>
      <option value="http_user_agent">UserAgent</option>
    </select>
  </div>
  <!--
  <div class="field">
    <a *ngIf="!more" (click)="more=true">高级</a>
    <a *ngIf="more" (click)="more=false">收起</a>
  </div>
  -->
  <div class="field">
    <div class="ui right floated buttons">
      <button class="ui green button" (click)="save()">保存</button>
      <div class="or"></div>
      <button class="ui gray button" (click)="cancel()">取消</button>
    </div>
  </div>
</div>
<!--
<div class="inline fields" *ngIf="more">
  <div class="fourteen wide field">
    <textarea width="100%"  [(ngModel)]="location.more" ></textarea>
  </div>
  <div class="two wide field">
    <button class="ui blue button" (click)="SaveLoction()">保存</button>
  </div>
</div>
-->
</div>
`

@Component({
  selector: '[ab-project-edit]',
  template: template,
  outputs: ['onCancelEditProject', 'onSaveProject']
})
export class ABProjectEditComponent {
  @Input() public project:any;
  public onCancelEditProject = new EventEmitter()
  public onSaveProject = new EventEmitter()
  more:boolean = false
  constructor(){}
  save(){
    this.onSaveProject.emit(this.project)
  }
  cancel(){
    this.onCancelEditProject.emit()
  }

}
