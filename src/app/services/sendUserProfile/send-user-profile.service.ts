import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendUserProfileService {

  constructor(private http:HttpClient) { }

  sendProfile(profile:any):Observable<any>{
    const url="http://localhost:3000/socializeAPI/v1.0/userManagement/signup"
    return this.http.post(url,{userProfile:profile})
  }

  
}
