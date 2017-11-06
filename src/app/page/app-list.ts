import { Component, OnInit } from '@angular/core';

let template:string = 
`
  <div class="main">
  </div>
`

@Component({
  selector: 'app-list',
  template: template
})
export class AppListPage implements OnInit  {
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
