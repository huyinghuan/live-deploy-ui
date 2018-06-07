import { Component, Input, EventEmitter} from '@angular/core';

let template:string = 
`
<div class="ui form">
<div class="inline fields">
  <div class="field">
    <input type="text" placeholder="版本" [(ngModel)]="version.tag">
  </div>
  <div class="field">
    <input type="number" min=1 max=100 placeholder="比例(1-100)"  [(ngModel)]="version.proportion">
  </div>
  <div class="field">
    <div class="ui right floated buttons">
      <button class="ui green button" (click)="SaveVersion()">保存</button>
      <div class="or"></div>
      <button class="ui gray button" (click)="CancelAddVersion()">取消</button>
    </div>
  </div>
</div>
</div>
`

@Component({
  selector: '[ab-version-edit]',
  template: template,
  outputs: ['onCancelAddVersion', 'onSaveVersion']
})
export class ABVersionEditComponent{
  public onCancelAddVersion = new EventEmitter()
  public onSaveVersion = new EventEmitter()
  @Input() public version:any = {}
  constructor(){}
  SaveVersion(){
    this.onSaveVersion.emit(this.version)
  }
  CancelAddVersion(){
    this.onCancelAddVersion.emit()
  }
}
