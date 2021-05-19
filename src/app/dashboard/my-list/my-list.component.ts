import { CompanyService } from './../../services/company/company.service';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  nombre = ''
  photo = ''
  email = ''
  bio = ''
  trabajos: Array<Job> = []

  constructor(
    private router: Router,
    private userService: UserService,
    private jobService: JobsService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.userService.userDetail().subscribe(
      (data) => {
        console.log(data)
        console.log(data.data.nombre)
        this.nombre = data.data.nombre
        this.bio = data.data.bio
        this.photo = data.data.photo
        this.email = data.data.email},
        (error) => {
          console.log('Error: ', error)
        },)

    this.companyService.companyList().subscribe(
      (data: Job[])=>{
        console.log(data)
        this.trabajos = data
      }


    )
  }



  formatDate(date?: string): string {
    return moment(date).locale('es-es').format("DD [de] MMMM [de] YYYY")
  }
}
