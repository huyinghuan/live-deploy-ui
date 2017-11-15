import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response  } from '@angular/http';
import {Router} from "@angular/router";
import 'rxjs/add/operator/toPromise';
import  * as alertjs from 'alertify.js'

@Injectable()
export class API {
  constructor(private http:Http, private router:Router){}
  fetch(url, data, method="GET"){
    let options:RequestOptionsArgs=  {
      method:method
    }
    if(method!="GET"){
      options.body = JSON.stringify(data);
    }else{
      options.params = data;
    }

    return new Promise((resolve, reject)=>{
      this.http.request(url,options).subscribe((response:Response)=>{
        if(method!="GET"){
          alertjs.success("操作成功！")
        }
        if(response.headers.get("content-type").indexOf('json')!=-1){
          resolve(response.json())
        }else{
          resolve(response.text())
        }
      }, (errorResponse:Response)=>{
        let msg = errorResponse.text()
        switch(errorResponse.status){
          case 401: 
            this.router.navigateByUrl("/login");
            break;
          case 403:
            alertjs.error(msg);
            break;
          case 404:
            this.router.navigateByUrl("/404");
            break;
          case 406:
            alertjs.error(msg)
            break
          case 504:
            alertjs.error("服务器超时")
            break;
          case 500:
            alertjs.closeLogOnClick(false).error(msg)
            break;
          default:
            alertjs.error("http status:", errorResponse.status +" " + errorResponse.text())
        }
      })
    })
  }
  get(url:string, data:any){
    return this.fetch(url, data)
  }
  post(url:string, data:any){
    return this.fetch(url, data, "POST")
  }
  put(url:string, data:any){
    return this.fetch(url, data, "PUT")
  }
  update(url:string, data:any){
    return this.fetch(url, data, "PUT")
  }
  remove(url:string){
    return this.fetch(url, {}, "DELETE")
  }
  all(method:string, url:string, data:any){
    return this.fetch(url, data, method)
  }
}