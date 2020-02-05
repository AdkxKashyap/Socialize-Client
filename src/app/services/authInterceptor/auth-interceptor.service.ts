import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { UserTokenService } from "../tokenService/user-token.service";
import { GetUserAuthProviderService } from '../getUserAuthProviderService/get-user-auth-provider.service';

@Injectable({
  providedIn: "root"
})
export class AuthInterceptorService implements HttpInterceptor {
  token: any;
  userAuthProvider:any
  intercept(
    req: import("@angular/common/http").HttpRequest<any>,
    next: import("@angular/common/http").HttpHandler
  ): import("rxjs").Observable<import("@angular/common/http").HttpEvent<any>> {
    if (this.token) {
      // console.log("In Interceptor");
      const oldBody = req.body;
      // console.log(oldBody)
      const newBody = { ...oldBody, userAuthProvider: "googleAuth" };
      const reqClone = req.clone({
        body: newBody,
        headers: req.headers.set("Authorization", "Bearer " + this.token),
        params: req.params.set("userAuthProvider", this.userAuthProvider)
      });
      // console.log(reqClone)
      return next.handle(reqClone);
    } else {
      return next.handle(req);
    }
  }

  constructor(tokenService: UserTokenService,userAuthProviderService:GetUserAuthProviderService) {
    this.token = tokenService.getToken();
    this.userAuthProvider=userAuthProviderService.getAuthProvider()
  }
}
