import { Component, Input, EventEmitter} from '@angular/core';

let template:string = 
`
<div class="ui form">
<div class="inline fields">
  <div class="field">
    <input type="text" placeholder="server ip" [(ngModel)]="server.server_ip">
  </div>
  <div class="field">
    <input type="number" placeholder="超时，默认0秒为nginx默认值" [(ngModel)]="server.timeout">
  </div>
  <div class="field"><label>备用？</label></div>
  <div class="field">
    <div class="ui toggle checkbox">
      <input type="checkbox"  [(ngModel)]="server.backup">
      <label></label>
    </div>
  </div>
  <div class="field"><label>下线？</label></div>
  <div class="field">
      <div class="ui toggle checkbox">
        <input type="checkbox"  [(ngModel)]="server.down">
        <label></label>
      </div>
  </div>
  <div class="field">
    <div class="ui right floated buttons">
      <button class="ui green button" (click)="SaveServer()">保存</button>
      <div class="or"></div>
      <button class="ui gray button" (click)="CancelAddServer()">取消</button>
    </div>
  </div>
</div>
</div>
`

@Component({
  selector: '[server-edit]',
  template: template,
  outputs: ['onCancelAddServer', 'onSaveServer']
})
export class ServerConfigEditComponent{
  public onCancelAddServer = new EventEmitter()
  public onSaveServer = new EventEmitter()
  @Input() public server = {}
  constructor(){}
  SaveServer(){
    this.onSaveServer.emit(this.server)
  }
  CancelAddServer(){
    this.onCancelAddServer.emit()
  }
}
