import { Component, OnInit } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';

let template:string = 
`
  <div class="main">
    <div class="ui form">
      <div class="inline fields">
        <div class="field"><label>应用</label></div>
        <div class="three wide field">
          <input type="text" placeholder="域名（可选）" [(ngModel)]="app.domain">
        </div>
        <div class="three wide field">
          <input type="number" placeholder="端口(可选，默认80)"  [(ngModel)]="app.port">
        </div>
        <div class="three wide field">
          <input type="text" placeholder="别称(可选，数字字母组合)"  [(ngModel)]="app.name">
        </div>
        <div class="field">
          <button class="ui blue button" (click)="add()">添加</button>
        </div>
      </div>
    </div>
  </div>
`

@Component({
  selector: 'app-config',
  template: template
})
export class AppConfigAddPage implements OnInit  {
  app:any ={
    domain: "",
    port: 80,
    name:""
  }
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  add(){
    if(this.app.port == 0){
      return 
    }
    this.api.post("nginx", {},this.app).then((data)=>{
     // this.navRouter.navigate(["api", "category", "start", this.params.start, 'end',this.params.end])
      this.navRouter.navigate(["index","app-config", data["id"]])
    })
  }
}
