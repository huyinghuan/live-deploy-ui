import { Component, Input, EventEmitter} from '@angular/core';
let template:string = `
<div class="ui vertical inverted sticky menu">
  <a class="ui logo icon image" href="/">
    <img src="/assets/images/logo.png">
  </a>
  <a class="item" [routerLink]="['machine']"  routerLinkActive="active">服务器列表</a>
  <a class="item">
    <div class="header">系统</div>
    <div class="menu">
      <a class="item" [routerLink]="['task']"  routerLinkActive="active">任务日志</a>
    </div>
  </a>
</div>
`

@Component({
  selector: '[left-nav]',
  template: template,
  outputs:["onEditServer", "onDeleteServer"]
})
export class LeftNavComponent{
  @Input() public server:any;
  constructor(){}
}
