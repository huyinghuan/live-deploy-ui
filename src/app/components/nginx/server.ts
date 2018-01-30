import { Component, Input, EventEmitter} from '@angular/core';
let template:string = 
`
  <td>{{server.server_ip}}</td>
  <td class="collapsing">{{server.timeout}}</td>
  <td  class="collapsing">
    <div class="ui toggle checkbox">
      <input type="checkbox" name="{{server.name}}-backup" [checked]="!server.backup" (change)="onUpdateServerStatus.emit({id:server.id,backup:!server.backup})">
      <label>
        <a *ngIf="!server.backup" class="ui blue label">主服务器</a>
        <a *ngIf="server.backup" class="ui gray label">从服务器</a>
      </label>
    </div>
  </td>
  <td class="collapsing">
    <div class="ui toggle checkbox">
      <input type="checkbox" name="{{server.name}}-down" [checked]="!server.down" (change)="onUpdateServerStatus.emit({id:server.id,down:!server.down})">
      <label>
        <a *ngIf="server.down" class="ui red label">Stop</a>
        <a *ngIf="!server.down" class="ui green label">Running</a>
      </label>
    </div>
  </td>
  <td class="collapsing">
    <div class="ui buttons">
      <button class="ui icon red button"  (click)="onDeleteServer.emit(server.id)" title="删除"><i class="trash icon"></i></button>
      <button class="ui icon blue button" (click)="onEditServer.emit(server)" title=“编辑”><i class="edit icon"></i></button>
    </div>
  </td>
`

@Component({
  selector: '[server-config]',
  template: template,
  outputs:["onEditServer", "onDeleteServer", "onUpdateServerStatus"]
})
export class ServerConfigComponent{
  @Input() public server:any;
  constructor(){}
  public onEditServer = new EventEmitter()
  public onDeleteServer = new EventEmitter()
  public onUpdateServerStatus = new EventEmitter()
}
