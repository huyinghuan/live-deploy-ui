import { Component, OnInit } from '@angular/core';

let template:string = 
`
<div id="container" class="pushable content">
  <div class="toc">
    <div class="ui vertical inverted sticky menu">
      <a class="ui logo icon image" href="/">
        <img src="/images/logo.png">
      </a>
      <a class="item">Features</a>
      <a class="item">Testimonials</a>
      <a class="item">Sign-in</a>
    </div>
  </div>
  <div class="article">
    <div class="ui menu">
      <div class="right menu">
        <a class="item">Sign Up</a>
        <a class="item">Help</a>
      </div>
    </div>
    <div class="pusher">
    <router-outlet></router-outlet>
    </div>
  </div>


</div>
`

@Component({
  selector: 'index-page',
  template: template
})
export class IndexPage implements OnInit  {
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
