import { Component, Input, EventEmitter} from '@angular/core';
let template:string = 
`
  <td>{{server.server_ip}}</td>
  <td>{{server.timeout}}</td>
  <td>{{server.backup}}</td>
  <td *ngIf="server.down">Stop</td>
  <td *ngIf="!server.down">Running</td>
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
  outputs:["onEditServer", "onDeleteServer"]
})
export class ServerConfigComponent{
  @Input() public server:any;
  constructor(){}
  public onEditServer = new EventEmitter()
  public onDeleteServer = new EventEmitter()
}
