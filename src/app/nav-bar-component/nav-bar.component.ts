import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormControl } from '@angular/forms';
import {GetSearchResService} from '../services/getSearchResService/get-search-res.service'
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  suggestions:[]
  searchForm
  constructor(private fb:FormBuilder,private getSearchRes:GetSearchResService) { }

  ngOnInit() {
    this.searchForm=this.fb.group({
      search:['']
    })
    
  }
   search(){
     this.getSearchRes.getSearchResults(this.searchForm.value.search).then((data)=>{
      console.log(data)
     })
    // console.log(this.searchForm.value.search)
  }
}
