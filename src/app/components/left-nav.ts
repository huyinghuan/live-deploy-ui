import { Component, Input, EventEmitter} from '@angular/core';
let template:string = `
<div class="ui vertical inverted sticky menu">
  <a class="ui logo icon image" href="/">
    <img src="/images/logo.png">
  </a>
  <a class="item" [routerLink]="['/index/app-config']"  routerLinkActive="active">服务列表</a>
  <a class="item">系统设置</a>
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
