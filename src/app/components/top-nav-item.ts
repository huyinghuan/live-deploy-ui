import { Component, Input, OnInit} from '@angular/core';
import { API } from '../services/API';
let template:string = `
  <i class="right chevron icon divider"></i>
  <a class="section" *ngIf="navItem.value" [routerLink]="navItem.url">{{navItem.label}}</a> 
  <div class="active section" *ngIf="isLast && !navItem.value ">{{navItem.label}}</div>

  <i class="right chevron icon divider" *ngIf="navItem.value"></i>
  <a class="section" *ngIf="!isLast && navItem.value" [routerLink]="navItem.url.concat(navItem.value)">{{navItem.name}}</a> 
  <div class="active section" *ngIf="isLast">{{navItem.name}}</div>
`

@Component({
  selector: '[top-nav-item]',
  template: template
})
export class TopNavItemComponent implements OnInit{
  @Input() public navItem:any;
  @Input() public isLast:boolean;
  constructor(private api:API){
    
  }
  ngOnInit(){
    if(this.navItem.value){
      console.log(this.navItem)
      let dataURL = [].concat(this.navItem.url)
      dataURL.push(this.navItem.value)
      this.api.get(dataURL.join(".")).then((data:any)=>{
        this.navItem.name= data.name
      })
    }
  }
  ngOnDestroy() {
    
  }
}
