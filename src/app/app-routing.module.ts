import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsernameFormComponent } from "./username-form/username-form.component";
import { SignInSignUpComponent } from "./sign-in-sign-up/sign-in-sign-up.component";
import { ShowSimilarPeopleComponent } from "./show-similar-people/show-similar-people.component";

const routes: Routes = [
  { path: '', component: SignInSignUpComponent },
  { path: "usernameForm", component: UsernameFormComponent },
  { path: "showSimilarPeople", component: ShowSimilarPeopleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
