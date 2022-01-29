import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { DataSharingServiceService } from "../services/dataSharing/data-sharing-service.service";

import { GoogleAuthService } from "../services/googleAuthService/google-auth.service";

declare const gapi: any;
@Component({
  selector: "app-sign-in-sign-up",
  templateUrl: "./sign-in-sign-up.component.html",
  styleUrls: ["./sign-in-sign-up.component.css"]
})
export class SignInSignUpComponent implements OnInit {
  container: Element;
  issignup:boolean
  islogin:boolean;
  myLocalStorage=window.localStorage
  existingUser: Boolean;
  ngOnInit() {
    this.googleInit();
    this.islogin = false;
    this.issignup = false;
  }

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private googleAuthService: GoogleAuthService
  ) {}

  //for google sign-in
  private clientId: string =
    "587767058687-f3677th4t0m5om1873i5p4vm4vf39ppf.apps.googleusercontent.com";
  public auth2: any;
  profile: any;
  public showUsernameForm = false;
  private token: any;
  error: any;
  private scope = [
    "profile",
    "email"
  ].join(" ");

  public async googleInit() {
    gapi.load("auth2", async () => {
      this.auth2 = gapi.auth2.init({
        client_id: this.clientId,
        cookiepolicy: "single_host_origin",
        scope: this.scope
      });
      this.attachSignin(document.getElementById("googleBtn"));
    });
  }

  public async attachSignin(element) {
    try {
      this.auth2.attachClickHandler(
        element,
        {},
        googleUser => {
          element.innerHTML =
            "Signed in: " + googleUser.getBasicProfile().getName();
          this.profile = googleUser.getBasicProfile();
          this.token = googleUser.getAuthResponse().id_token;
          //store data in local storage
          this.myLocalStorage.setItem("gProfile",JSON.stringify(this.profile))
          this.myLocalStorage.setItem("token",this.token)
          this.myLocalStorage.setItem("userAuthProvider","googleAuth")
          // console.log(this.profile);
          this.googleAuthService.checkExistingUser(this.token).subscribe(
            res => {
              if (res.error) {
                throw new Error(res.error);
              }
              this.existingUser = res;
              //check weather user exists in db
              if (true) {
                //create a new profle
                this.ngZone.run(() => {
                  this.router.navigate(["/usernameForm"], {
                    state: {
                      profile: this.profile,
                      userAuthProvider: "googleAuth",
                      token: googleUser.getAuthResponse().id_token
                    }
                  });
                });
              }
              if(this.existingUser==true){
                //redirect to home component
                // this.router.navigate("/")
              }
              console.log(this.existingUser);
            },
            err => {
              this.error=err.error.error
              window.location.reload();
              console.log(this.error)
            }
          );

        
        },
        function(error) {
          this.error = error.message;
        }
      );
    } catch (error) {
      this.error = error;
    }
  }

  public signOut() {
    let auth = gapi.auth2.getAuthInstance();
    auth.signOut().then(function() {
      console.log("User signed out.");
    });
  }
/**Google sign in ends */


  activateSlidingWindowClass(event:Event) {
    const tar = event.target as Element
   
    /**If signup btn clicked than display signup form else display login  */
    if(tar.id == "signup") {
      console.log(tar.id);
      this.islogin = false;
      this.issignup = true;
    } else if(tar.id == "login") {
      console.log(tar.id);
      this.islogin = true;
      this.issignup = false;
    }
    this.container.classList.add("sliding_window-active");
  }
  deactivateSlidingWindowClass() {
    this.container.classList.remove("sliding_window-active");
  }
  ngAfterViewInit() {
    this.container = document.getElementById("container") as Element;
  }
}
