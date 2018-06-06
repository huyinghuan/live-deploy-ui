import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription'
import * as alertjs from 'alertify.js';
declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="ui form">
    <div class="inline fields">
      <div class="field"><label>服务器</label></div>
      <div class="six wide field">
        <input type="text" placeholder="IP" [(ngModel)]="machine.ip">
        <input type="text" placeholder="名称" [(ngModel)]="machine.name">
      </div>
      <div class="field">
          <button class="ui icon blue button" (click)="save()"><i class="save icon"></i>保存</button>
          <button class="ui icon blue button" (click)="showKey()"><i class="eye icon"></i>Key</button>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <div class="ui massive labels">
    <a class="ui green label" [routerLink]="['nginx']" ><i class="sitemap icon"></i>Nginx</a> <!---->
    <a class="ui green label" [routerLink]="['ab']" ><i class="random icon"></i>A/B Test</a>
    <!--<a class="ui orange label" [routerLink]="['letsencrypt']" ><i class="lock icon"></i>Let's Encrypt</a>-->
    <!-- <a class="ui orange label" [routerLink]="['service']" ><i class="cogs icon"></i>Service</a>-->
    <!-- <a class="ui orange label" [routerLink]="['git']" ><i class="cogs icon"></i>Git项目</a>-->
  </div>
</div>
`

@Component({
  selector: 'machine-panel',
  template: template
})
export class MachinePanelPage implements OnInit  {
  machine:any = {}
  private subscriptParams:ISubscription
  private params:any
  constructor(private api:API, private route:ActivatedRoute){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
    this.api.get("machine", this.params).then((data)=>{
      this.machine = data
    })
  }
  save(){
    this.api.put("machine", this.params, this.machine).then((data)=>{
      this.machine = data
    })
  }
  
  ngOnDestroy() {
    this.subscriptParams.unsubscribe()
  }

  showKey(){
    confirm("CFBKey: " + this.machine.cfb_key)
  }
  
}
