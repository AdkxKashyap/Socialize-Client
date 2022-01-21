import { Component, OnInit } from '@angular/core';
import {User} from '../models/user'
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetAllUsernamesService } from '../services/getAllUsernamesService/get-all-usernames.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User
  error:any
  signupForm:FormGroup
  checked:boolean;
  constructor(private fb:FormBuilder,private getAllUsernames:GetAllUsernamesService) { 
    
  }

  ngOnInit() {
    this.checked = false;
    try {
      this.createForm()
    } catch (error) {
      console.log(error.message)
    }
    
  }

  createForm(){
    //username can either be the actual username or the email
    this.signupForm=this.fb.group({
      username:['',Validators.required],
      password:['']
    })
  }

}
