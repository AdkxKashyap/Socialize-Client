import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class GetUsersByHobbiesAndProfessionService {
  constructor(private http: HttpClient) {}

  getUsers(userPrefs:{}): Observable<any> {
    
    const url =
    environment.port+"/socializeAPI/v1.0/userManagement/getUsersByHobbiesAndProfession"
    return this.http.post(url,userPrefs);
  }
}
