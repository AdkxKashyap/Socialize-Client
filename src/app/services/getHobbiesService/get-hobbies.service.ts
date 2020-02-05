import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class GetHobbiesService {
  url =environment.port+"/socializeAPI/v1.0/userManagement/getHobbies";
  constructor(private http: HttpClient) {}

  getHobbies(): Observable<String[]> {
    return this.http.get<String[]>(this.url);
  }
}
