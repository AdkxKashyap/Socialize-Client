import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetAllUsernamesService {
  private url="http://localhost:3000/socializeAPI/v1.0/userManagement/getAllUsernames"
  constructor(private http:HttpClient) { }
  
  getUsernames(pattern):Observable<any>{
    
    return this.http.get<any>(this.url+"/"+pattern)
  }
  
}
