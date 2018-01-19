import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Http, Headers, RequestOptions, Response} from '@angular/http'
import {HttpRequest, HttpHeaders, HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment';


@Injectable()
export class FundService {

  upload_feed_image_url = "uploadFile";
  submit_fundRequest_url = "funds?command=request";
  approve_fundRequest_url = "funds?command=approve";
  fund_detail_url = "funds/{1}";
  create_channel_url = "channels";
  delete_channel_url = "channels"; 
  run_process = "channels/{1}/processes/{2}";

  constructor(private http: Http, private router: Router, private httpClient: HttpClient) {  }

  createChannel(channel) {
    return this.doPost(environment.serverUrl+this.create_channel_url, null, channel);
  }


  doGet(path: string, headerExtra: any) {
    let headers = new Headers();
    if(headerExtra) {
      for(let key in headerExtra) 
        headers.append(key, headerExtra[key]);
    }
    return this.http.get(path,new RequestOptions({headers: headers}));
  }

  doPlainGet(path: string) {
    return this.http.get(path);
  }

  doPostFile(path: string, headerExtra: any, body: any) {    
    const req = new HttpRequest('POST', path, body);
    return this.httpClient.request(req);
  }

  doPost(path: string, headerExtra: any, body: any) {
    let headers = new Headers();
    if(headerExtra) {
      for(let key in headerExtra) 
        headers.append(key, headerExtra[key]);
    }
    return this.http.post(path,body,new RequestOptions({headers: headers}));
  }

  doDelete(path: string, headerExtra: any) {
    let headers = new Headers();
    if(headerExtra) {
      for(let key in headerExtra) 
        headers.append(key, headerExtra[key]);
    }
    return this.http.delete(path,new RequestOptions({headers: headers}));
  }

  

  doPut(path: string, headerExtra: any, body: any) {  
    let headers = new Headers();
    if(headerExtra) {
      for(let key in headerExtra) 
        headers.append(key, headerExtra[key]);
    }
    return this.http.put(path,body,new RequestOptions({headers: headers}));
  }
}
