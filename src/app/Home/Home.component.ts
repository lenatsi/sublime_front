import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
//import {DBService} from './../'

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  search(){
    this.router.navigate(["/search"])
  }
}
