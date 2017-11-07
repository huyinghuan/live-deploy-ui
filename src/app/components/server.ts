import { Component, OnInit, Input } from '@angular/core';
import { API } from '../services/API';
import { ActivatedRoute, ParamMap, Router} from '@angular/router';

let template:string = 
`

  <div class="ui form">
    <div class="inline fields">
    </div>
  </div>
`

@Component({
  selector: 'server-config',
  template: template
})
export class ServerConfigComponent implements OnInit  {
  @Input() server:any;
  constructor(private api:API,private route:ActivatedRoute, private navRouter: Router){}
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
}
