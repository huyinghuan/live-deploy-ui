import { Component, OnInit, ElementRef } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';
import * as alertjs from 'alertify.js';
import { root } from 'postcss';
declare var jQuery:any
let template:string = 
`
<div class="main">
  <div class="data-form">
    <div class="ui form">
      <div class="inline fields">
        <div class="field"><label>域名</label></div>
        <div class="three wide field">
          <input type="text" placeholder="名称" [(ngModel)]="https.url">
        </div>
        <div class="field"><label>邮箱</label></div>
        <div class="three wide field">
          <input type="text" placeholder="名称" [(ngModel)]="https.email">
        </div>
        <div class="field">
          <div class="ui buttons">
            <button class="ui icon blue button" (click)="save()"><i class="save icon"></i>保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="ui divider"></div>
  <div class="data-table"></div>
</div>
`

@Component({
  selector: 'git-list',
  template: template
})
export class GitPage implements OnInit  {
  serverList:any = []
  private subscriptParams
  private params:any = {}
  https:any = {}
  save(){}
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router, private ele:ElementRef){}
  ngOnInit() {
    this.subscriptParams = this.route.params.subscribe((params)=>{
      this.params = params
    })
  }
  ngAfterContentChecked(){}
  ngOnDestroy() {this.subscriptParams.unsubscribe()}
}
