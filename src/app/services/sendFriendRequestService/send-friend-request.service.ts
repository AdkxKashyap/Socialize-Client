import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class SendFriendRequestService {
  url:string
  constructor(private http:HttpClient) { }

  sendRequest(username):Observable<any>{
    this.url=environment.port+"/socializeAPI/v1.0/eventUpdates/"+username+"/friendRequest"
    return this.http.post(this.url,{})
  }
}
