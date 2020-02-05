import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

 userToken=localStorage.getItem("token")
  
  constructor() { }
  getToken():String{
   return this.userToken
  }
}
