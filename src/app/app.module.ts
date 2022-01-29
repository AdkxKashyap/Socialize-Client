import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavBarComponent } from "./nav-bar-component/nav-bar.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

//Components
import { SignupComponent } from "./signup/signup.component";
import { SignInSignUpComponent } from "./sign-in-sign-up/sign-in-sign-up.component";
import { UsernameFormComponent } from "./username-form/username-form.component";

//Services
import { GetHobbiesService } from "./services/getHobbiesService/get-hobbies.service";
import { DataSharingServiceService } from "./services/dataSharing/data-sharing-service.service";
import { GetSearchResService } from "./services/getSearchResService/get-search-res.service";
import { GoogleAuthService } from "./services/googleAuthService/google-auth.service";
import { GeneratePasswordService } from "./services/generatePasswordService/generate-password.service";
import { SendUserProfileService } from "./services/sendUserProfile/send-user-profile.service";
import { GetUsersByHobbiesAndProfessionService } from "./services/getUsersByHobbiesAndProfessionService/get-users-by-hobbies-and-profession.service";
import { GetAllUsernamesService } from "./services/getAllUsernamesService/get-all-usernames.service";
import { GetProfessionsService } from "./services/getAllProfessionsService/get-professions.service";
import {UserTokenService}from "./services/tokenService/user-token.service"
import {AuthInterceptorService} from "./services/authInterceptor/auth-interceptor.service"
import {GetUserAuthProviderService} from "./services/getUserAuthProviderService/get-user-auth-provider.service"
//angular-material imports
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from "@angular/material/button";
import { ShowSimilarPeopleComponent } from "./show-similar-people/show-similar-people.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { SendFriendRequestService } from './services/sendFriendRequestService/send-friend-request.service';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpService } from "./services/signUpService/sign-up.service";
import { LoginService } from "./services/loginService/login.service";

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SignupComponent,
    SignInSignUpComponent,
    UsernameFormComponent,
    ShowSimilarPeopleComponent,
    LoginComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule
  ],
  providers: [
    GetSearchResService,
    GetAllUsernamesService,
    GetProfessionsService,
    GetHobbiesService,
    DataSharingServiceService,
    GoogleAuthService,
    GeneratePasswordService,
    SendUserProfileService,
    GetUsersByHobbiesAndProfessionService,
    UserTokenService,
    SignUpService,
    LoginService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptorService,
      multi:true
    },
    GetUserAuthProviderService,
    SendFriendRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
