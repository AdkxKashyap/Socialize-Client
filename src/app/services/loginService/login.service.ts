import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = environment.port + "/socializeAPI/v1.0/login";
  constructor(private http : HttpClient) { }

  login(details: any) {
    let headers = {'Content-Type': 'application/json'}
    return this.http.post(this.url, details, {headers});
  }
}
