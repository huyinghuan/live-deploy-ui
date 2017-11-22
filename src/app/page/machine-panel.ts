import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as alertjs from 'alertify.js';
declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="field"><label>服务器</label></div>
      <div class="three wide field">
        <input type="text" placeholder="名称" [(ngModel)]="machine.name">
      </div>
      <div class="field">
        <div class="ui buttons">
          <button class="ui icon blue button" (click)="save()"><i class="save icon"></i>保存</button>
        </div>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
</div>
`

@Component({
  selector: 'machine-panel',
  template: template
})
export class MachinePanelPage implements OnInit  {
  
  ngOnInit() {
  }
  
  ngOnDestroy() {}
  
}
