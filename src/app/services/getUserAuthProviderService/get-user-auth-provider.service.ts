import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserAuthProviderService {

  constructor() { }

  getAuthProvider():String{
    return localStorage.getItem("userAuthProvider")
  }
}
