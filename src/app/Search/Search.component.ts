import { JobsService } from 'src/app/services/jobs/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Job } from '../models/job.model';
import * as moment from 'moment';

@Component({
  selector: 'app-Search',
  templateUrl: './Search.component.html',
  styleUrls: ['./Search.component.scss']
})
export class SearchComponent implements OnInit {

  name: string = ''
  description: string = ''
  localization: string = ''
  savedAt = ''
  filtro = ''
  trabajos: Array<Job> = []
  filter:string = ''


  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private jobService: JobsService,
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((value) => {
      if (value.name != undefined) {
        this.filter = value.name
      }
    })
    this.loadData()
  }

 /*  clearDate(event) {
    event.stopPropagation();
    this.dateStartSearch = null;
    this.dateEndSearch = null;
    this.startInput = undefined;
    this.endInput = null
    this.loadData()
  } */

  onSearchChange(searchValue: any) {
    this.filtro = searchValue.target.value
    const params = this.filtro
    console.log(params)
    this.jobService.getallJobs(params,'','').subscribe(
      (data: Job[]) => {
        this.trabajos = data
        console.log(data)
      },
      (error) => {
        console.log('Error:', error)
      },
    )
  }


  loadData() {

    this.jobService.getallJobs(this.filter, this.description, this.localization).subscribe(
      (data: Job[]) => {
        this.trabajos = data
        console.log(data)
      },
      (error) => {
        console.log('Error:', error)
      },
    )
  }

  formatDate(date?: string): string {
    return moment(date).locale('es-es').format("DD [de] MMMM [de] YYYY")
  }

}
