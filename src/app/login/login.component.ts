import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GetAllUsernamesService } from "../services/getAllUsernamesService/get-all-usernames.service";
import { LoginService } from "../services/loginService/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  user: User;
  error: any;
  loginForm: FormGroup;
  checked: boolean;
  spinnerActive: boolean = false;
  tmpprofile: { usernametmp: string; tmpImageURL: string; userAuthProvider: string; };
  loginerr: any;
  constructor(
    private fb: FormBuilder,
    private getAllUsernames: GetAllUsernamesService,
    private loginService : LoginService,
    private router:Router
  ) {}

  ngOnInit() {
    this.checked = false;
    try {
      this.createForm();
    } catch (error) {
      console.log(error.message);
    }
  }

  createForm() {
    //username can either be the actual username or the email
    this.loginForm = this.fb.group({
      id: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  submitFormDetails() {
    this.spinnerActive = true;
    //for now only using email, change this
    let toSend = {
      username:this.loginForm.value.id,
      password:this.loginForm.value.password
    }
    console.log(toSend)
    this.loginService.login(toSend).subscribe({
      next: (data:any) => {
        this.spinnerActive = false;
        localStorage.setItem("token", data.token);
        let email:String = this.loginForm.value.id;
        // these are temporary username and image just to show in the username form.
         this.tmpprofile = {
          usernametmp: email.substring(0, email.indexOf("@")),
          tmpImageURL : "assets/defaultAvatars/avatar2.png",
          userAuthProvider:"default"
        }
        this.router.navigate(["/usernameForm"], {
          state: {
            profile: this.tmpprofile,
            userAuthProvider: "default",
            // token: data.token
          }
        });
        console.log(data);
      },
      error: (err) => {
        this.spinnerActive = false;
        console.log(err);
        this.loginerr = err.error.error
      },
    })
  }
}
