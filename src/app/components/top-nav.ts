import { Component, Input, OnInit} from '@angular/core';
import { API } from '../services/API';

let template:string = `
  <div class="right menu">
    <a class="item">{{username}}</a>
    <a class="item"(click)="logout()">注销</a>
    <a class="item">Help</a>
  </div>
`

@Component({
  selector: '[top-nav]',
  template: template
})
export class TopNavComponent implements OnInit{
  username = "未登录"
  constructor(private api:API){}
  ngOnInit(){
    this.api.get("session").then((data)=>{
      this.username = (data as any).name
    })
  }
  logout(){
    this.api.remove("session")
  }
}
