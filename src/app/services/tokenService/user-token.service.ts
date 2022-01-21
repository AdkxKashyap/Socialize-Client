import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserTokenService {

 userToken=localStorage.getItem("token")
  
  constructor() { }
  getToken():any{
   return this.userToken == null ? console.log("Token Not found") : this.userToken;   
    
  }
}
