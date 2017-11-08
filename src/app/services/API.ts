import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response  } from '@angular/http';
import {Router} from "@angular/router";
import 'rxjs/add/operator/toPromise';
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
        if(response.text()==""){
          return resolve("")
        }
        if(response.headers.get("content-type").indexOf('json')!=-1){
          resolve(response.json())
        }else{
          resolve(response.text())
        }
      }, (errorResponse:Response)=>{
        switch(errorResponse.status){
          case 401: 
            this.router.navigateByUrl("/login");
            break;
          case 403:
            console.log("用户名或密码错误");
            break;
          case 504:
            console.log("服务器超时")
            break;
          case 500:
            console.log(errorResponse.text())
            break;
          default:
            console.log("http status:", errorResponse.status, errorResponse.text())
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