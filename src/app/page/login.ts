import { Component } from '@angular/core';
import { API } from '../services/API';

let template:string = 
`
<div class="ui middle aligned center aligned grid" style="height: 100%">
<div class="column" style="max-width: 450px;">
  <h2 class="ui teal image header">
    <!-- <img src="/img/logo.png" class="logo"> -->
    <div class="content">Admin</div>
  </h2>
  <form class="ui large form">
    <div class="ui stacked segment">
      <div class="field">
        <div class="ui left icon input">
          <i class="user icon"></i>
          <input type="text" placeholder="用户名" [(ngModel)]="user.name" name="user" >
        </div>
      </div>
      <div class="field">
        <div class="ui left icon input">
          <i class="lock icon"></i>
          <input type="password" placeholder="密码" [(ngModel)]="user.password" name="password">
        </div>
      </div>
      <div class="ui fluid large teal submit button" (click)="login(user)">Login</div>
    </div>
  </form>
</div>
`

@Component({
  selector: "login",
  template: template,
  providers:[API]
})
export class LoginPage {
  user = {
    name:"",
    password:""
  }
  constructor(private api:API){}
  login(user){
    this.api.post("/api/session", user).then((data)=>{
      console.log(data,9999)
    })
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    document.querySelector('body').setAttribute("class", "bg")
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    document.querySelector('body').removeAttribute("class")
  }
}
