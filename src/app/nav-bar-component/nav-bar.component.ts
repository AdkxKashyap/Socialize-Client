import { Component, OnInit , AfterViewInit} from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControl } from '@angular/forms';
import {GetSearchResService} from '../services/getSearchResService/get-search-res.service'
import { environment } from 'src/environments/environment';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, AfterViewInit {
  suggestions:any;
  searchForm
  display = "none";
  searchLimit:any
  //toggle backdrop
  activateBackdrop:boolean;
  url = environment.port + "/socializeAPI/v1.0/avatar/"
  constructor(private fb:FormBuilder,private getSearchRes:GetSearchResService) { }

  ngAfterViewInit(): void {
    /**This is used so that on every keypress we dont send req to server */
    const targetNode = document.getElementById("searchBox")
    const clicks = fromEvent(targetNode, 'keyup');
    const result = clicks.pipe(debounceTime(1000));
    result.subscribe(x => {
      this.search();
    });
  }

  ngOnInit() {
    this.suggestions=[];
    this.searchLimit = 5;
    this.suggestions = [];
    this.searchForm=this.fb.group({
      search:['']
    })
    this.activateBackdrop = false;
  }
  // for search modal
   search(){
    this.suggestions = [];
    
     this.getSearchRes.getSearchResults(this.searchForm.value.search, this.searchLimit).then((data:[])=>{
      let obj = {};
      console.log(data)
      if(data.length == 0 && this.searchForm.value.search != '') {
        obj['name'] = "No Humans Found!"
        obj['username'] = "n01"
        obj['image'] = "assets/defaultAvatars/avatar1.png"
        this.suggestions.push(obj);
      }
       data.forEach((user:any)=>{
        
         obj['name'] = user.name
         obj['username'] = user.username;
         obj['image'] = this.url+user.username;
        this.suggestions.push(obj);
        
       })
     
       })
    // console.log(this.searchForm.value.search)
  }
  openModal() {

    this.display = "block";
    this.activateBackdrop = true;
  }
  onCloseHandled() {
    this.activateBackdrop = false;
    this.display = "none";
  }
  // search modal ends
}
