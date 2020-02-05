import { Component, OnInit } from '@angular/core';
import {User} from '../models/user'
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GetAllUsernamesService } from '../services/getAllUsernamesService/get-all-usernames.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User
  error:any
  signupForm:FormGroup
  constructor(private fb:FormBuilder,private getAllUsernames:GetAllUsernamesService) { 
    
  }

  ngOnInit() {
    
    try {
      this.createForm()
    } catch (error) {
      console.log(error.message)
    }
    
  }

  createForm(){
    this.signupForm=this.fb.group({
      name:['',[Validators.required]],
      username:['',Validators.required],
      avatar:[''],
      age:['',Validators.required],
      email:['',Validators.email],
      birthday:[''],
      profession:['',Validators.required],
      hobbies:['',Validators.required]
    })
  }

  
}
