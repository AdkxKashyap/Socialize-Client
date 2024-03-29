import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetProfessionsService {
  url=environment.port+"/socializeAPI/v1.0/userManagement/getAllProfessions"
  constructor(private http:HttpClient) { }

  getProfessions():Observable<any[]>{
    return this.http.get<String[]>(this.url)
  }
}
