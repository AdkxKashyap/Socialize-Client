import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  constructor(private http:HttpClient) { }

  checkExistingUser(auth_token:any):Observable<any>{
    const url="http://localhost:3000/socializeAPI/v1.0/userManagement/googlesAuth/checkExistingUser"
    return this.http.post<any>(url,{auth_token:auth_token})
  }
}
