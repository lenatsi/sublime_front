import { ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-Job-detail',
  templateUrl: './Job-detail.component.html',
  styleUrls: ['./Job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  id = ''
  name = ''
  logo = ''
  description =''
  localization = ''
  city=''
  type= ''
  publishedBy = ''
  savedAt = ''

  constructor(private activeRoute: ActivatedRoute, private jobService: JobsService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( parm => {
      console.log(parm.id)
      this.id = parm.id
    })
    this.getJob()
  }
 getJob(){
  const id = this.id
  this.jobService.getJob(id).subscribe((data) => {
    console.log(data)
    this.name = data.name
    this.logo = data.publishedBy.photo
    this.description = data.description
    this.localization = data.localization
    this.publishedBy = data.publishedBy.nombre
    this.city = data.city
    this.type = data.type
    this.savedAt = moment(data.savedAt).locale('Es-es').format('DD [de] MMMM [de] yyyy')
  })
  this.jobService.getJob(id).subscribe(
    (data) => {
      console.log(data.name)
    },
    (error) => {
      console.log('Error:', error)
    },
  )
 }
}
