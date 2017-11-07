import { Component, Input, EventEmitter} from '@angular/core';
let template:string = 
`
  <td>{{server.server_ip}}</td>
  <td>{{server.timeout}}</td>
  <td>{{server.backup}}</td>
  <td>{{server.down}}</td>
  <td class="collapsing">
    <div class="ui buttons">
      <button class="mini ui red button"  (click)="onDeleteServer.emit(server.id)">删除</button>
      <div class="or"></div>
      <button class="mini ui blue button" (click)="onEditServer.emit(server)">编辑</button>
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
