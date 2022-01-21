import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class GetSearchResService {
  url: string;
  constructor(private http: HttpClient) {}

  getSearchResults(data: String, limit:Number): Promise<any> {
    this.url = "http://localhost:3000/socializeAPI/v1.0/search?search=" + data + "&limit=" + limit;
    return this.http
      .get(this.url)
      .toPromise()
      .catch(err => {
        throw new Error(err.message);
      });
  }
}
