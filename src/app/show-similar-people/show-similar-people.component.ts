import { Component, OnInit } from "@angular/core";
import { GetUsersByHobbiesAndProfessionService } from "../services/getUsersByHobbiesAndProfessionService/get-users-by-hobbies-and-profession.service";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { SendFriendRequestService } from '../services/sendFriendRequestService/send-friend-request.service';
@Component({
  selector: "app-show-similar-people",
  templateUrl: "./show-similar-people.component.html",
  styleUrls: ["./show-similar-people.component.css"]
})
export class ShowSimilarPeopleComponent implements OnInit {
  constructor(
    private getUsersByProfessionAndHobbies: GetUsersByHobbiesAndProfessionService,
    private router: Router,
    private sendFriendRequestService:SendFriendRequestService
  ) {
    this.profession = router.getCurrentNavigation().extras.state.profession;
    this.hobbies = router.getCurrentNavigation().extras.state.hobbies;
    this.localProfile = localStorage.getItem("googleProfile");
    this.token = localStorage.getItem("token");
    this.username = localStorage.getItem("username");
    this.avatarResURL = environment.port + "/socializeAPI/v1.0/avatar/";
  }
  localProfile: any;
  token: any;
  username: string;
  users: any;
  error: any;
  profession: String;
  hobbies: String[];
  avatarResURL: any;
  userAvatar: String;
  ngOnInit() {
    console.log(this.avatarResURL);
    console.log(this.hobbies);
    try {
      const userPrefs = {
        hobbies: this.hobbies,
        profession: this.profession
      };
      this.getUsersByProfessionAndHobbies.getUsers(userPrefs).subscribe(
        res => {
          var matchedUsers = res.filter(user => user.username != this.username); //bring from local storage
          this.users = matchedUsers.map(user => ({
            username: user.username,
            profession:user.profession,
            hobbies:user.hobbies,
            avatar: this.avatarResURL + user.username
          }));
  
          // console.log(this.userAvatar)
          console.log(this.users);
        },
        err => {
          console.log(err.error.error);
          this.error = err.error.error;
        }
      );
    } catch (error) {
      console.log(error.error)
    }
    
      //FOR TESTING
    // this.users = [
    //   {
    //     username: "ak1",
    //     profession: "singer",
    //     avatar: "../../assets/testAvatar3.png"
    //   },
    //   {
    //     username: "ak1",
    //     profession: "singer",
    //     avatar: "../../assets/testAvatar.png"
    //   },
    //   {
    //     username: "ak1",
    //     profession: "singer",
    //     avatar: "../../assets/testAvatar.png"
    //   },
    //   {
    //     username: "ak1",
    //     profession: "singer",
    //     avatar: "../../assets/testAvatar3.png"
    //   }
    // ];
  }

  sendFriendRequest(friend){
    this.sendFriendRequestService.sendRequest(friend).subscribe((res)=>{
      console.log(res)
    },
    err=>{
      this.error=err.error.error
      console.log(this.error)
    })
  }
}
