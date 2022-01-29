//angular utils imports
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

//Services Imports
import { GetAllUsernamesService } from "../services/getAllUsernamesService/get-all-usernames.service";
import { GetProfessionsService } from "../services/getAllProfessionsService/get-professions.service";
import { GetHobbiesService } from "../services/getHobbiesService/get-hobbies.service";
import { GeneratePasswordService } from "../services/generatePasswordService/generate-password.service";
import { SendUserProfileService } from "../services/sendUserProfile/send-user-profile.service";
import { UserTokenService } from "../services/tokenService/user-token.service";

@Component({
  selector: "app-username-form",
  templateUrl: "./username-form.component.html",
  styleUrls: ["./username-form.component.css"],
})
export class UsernameFormComponent implements OnInit {
  usernameForm: FormGroup;
  error: any;
  //user Info
  isUsername_Available = true;
  professions: String[];
  password: String;
  email: String;
  hobbies: String[];
  username: String;
  userFullName: String;
  userProfileImageURL: any;
  userAuthProvider: String;
  token: any;
  message: any;
  //data send by  signin signup comp
  userProfile: any;

  completeUserProfile: {};
  myLocalstorage = window.localStorage;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private getAllUsernames: GetAllUsernamesService,
    private getProfessions: GetProfessionsService,
    private getHobbies: GetHobbiesService,
    private generatePassword: GeneratePasswordService,
    private sendUserProfile: SendUserProfileService,
    private tokenService: UserTokenService
  ) {
    this.userProfile = this.router.getCurrentNavigation().extras.state.profile;
    this.userAuthProvider =
      this.router.getCurrentNavigation().extras.state.userAuthProvider;
    this.token = tokenService.getToken();
  }

  ngOnInit() {
    this.createUsernameForm();
    this.getAllProfessions();
    this.getAllHobbies();

    if (this.userAuthProvider == "default") {
      this.userFullName = this.userProfile.usernametmp;
      this.userProfileImageURL = this.userProfile.tmpImageURL;
      document.getElementById("headerImage").style.backgroundImage =
        "url('" + this.userProfileImageURL + "')";
    } else {
      this.userFullName = this.userProfile.getName();
      this.userProfileImageURL = this.userProfile.getImageUrl();
      document.getElementById("headerImage").style.backgroundImage =
        "url('" + this.userProfileImageURL + "')";
    }

    //generate password if userAuthProvider !default
    if (this.userAuthProvider !== "default") {
      this.password = this.generatePassword.generatePassword();
    }
  }

  //username form
  createUsernameForm() {
    this.usernameForm = this.fb.group({
      username: ["", [Validators.required]],
      profession: ["", [Validators.required]],
      hobbies: ["", [Validators.required]],
    });
  }

  async isUsernameAvailable() {
    this.isUsername_Available = true;
    this.getAllUsernames
      .getUsernames(this.usernameForm.value.username)
      .subscribe(
        (usernames) => {
          const myUsername = this.usernameForm.value.username;
          usernames.forEach((val) => {
            if (myUsername == val.username) {
              this.isUsername_Available = false;
            }
          });
          // console.log(this.isUsername_Available)
        },
        (err) => {
          this.error = err.message;
        }
      );
  }

  getAllProfessions() {
    this.getProfessions.getProfessions().subscribe(
      (professions) => {
        this.professions = professions;
      },
      (err) => {
        this.error = err.message;
      }
    );
  }
  getAllHobbies() {
    this.getHobbies.getHobbies().subscribe((hobbies) => {
      this.hobbies = hobbies;
    });
  }

  submitFormDetails() {
    //convert user values to lowercase for case insensitive search at server side
    //username.email,password are unique so case sensitive

    try {
      this.completeUserProfile = {
        name: this.userProfile.getName().toLowerCase(),
        username: this.usernameForm.value.username,
        avatar: this.userProfile.getImageUrl(),
        email: this.userProfile.getEmail(),
        profession: this.usernameForm.value.profession,
        password: this.password,
        userAuthProvider: this.userAuthProvider,
        token: this.token,
        hobbies: this.usernameForm.value.hobbies,
      };
      // console.log(this.completeUserProfile)
      this.sendUserProfile.sendProfile(this.completeUserProfile).subscribe(
        () => {
          this.myLocalstorage.setItem(
            "username",
            this.usernameForm.value.username
          );
          this.router.navigate(["/showSimilarPeople"], {
            state: {
              profession: this.usernameForm.value.profession,
              hobbies: this.usernameForm.value.hobbies,
            },
          });
        },
        (err) => {
          this.error = err.error.error;
          // this.error=err.message
          // throw new Error(err.message)
        }
      );
    } catch (error) {
      this.error = error.message;
    }
  }
  ngAfterViewInit() {}
}
