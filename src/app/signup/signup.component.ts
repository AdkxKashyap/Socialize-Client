import { Component, OnInit } from "@angular/core";
import { User } from "../models/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GetAllUsernamesService } from "../services/getAllUsernamesService/get-all-usernames.service";
import { SignUpService } from "../services/signUpService/sign-up.service";
import { error } from "console";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  user: User;
  error: any;
  signupForm: FormGroup;
  signUpError:String;
  tmpprofile:{}
  usernametmp:String;
  tmpImageURL:String;
  spinnerActive:boolean = false;
  constructor(
    private fb: FormBuilder,
    private getAllUsernames: GetAllUsernamesService,
    private signUpService: SignUpService,
    private router:Router
  ) {}

  ngOnInit() {
    try {
      this.createForm();
    } catch (error) {
      console.log(error.message);
    }
  }

  createForm() {
    this.signupForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  submitFormDetails() {
    this.spinnerActive = true;
    //****REMOVE USERNAME FROM HERE */
    let toSend = {
      userProfile: {
        ...this.signupForm.value,
        username:this.signupForm.value.email.substring(0, this.signupForm.value.email.indexOf("@")),
        userAuthMethod: "default",
      }
    };
    this.signUpService.signUpUser(toSend).subscribe({
      next: (data:any) => {
        this.spinnerActive = false;
        localStorage.setItem("token", data.token);
        let email:String = this.signupForm.value.email;
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
        let er = err.error.error;
        if(er.indexOf("duplicate") > -1) {
          this.signUpError = "EmailID already exists. Please Login";
        }
      },
    });
  }
}
