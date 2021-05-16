import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job} from './../../models/job.model'
import { JobsService } from 'src/app/services/jobs/jobs.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {

  name = ''
  description = ''
  localization = ''
  city = ''
  type = ''
  publishedBy = ''
  id = ''
  editForm: FormGroup
  isSend = false
  job: Job = new Job()

  constructor(
    private jobsService: JobsService,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private activeRoute: ActivatedRoute,
  ) {
    this.editForm = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      localization: ['', [Validators.required]],
      city: ['', [Validators.required]],
      type: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      this.id = param.id
      if (this.id !== undefined){
        console.log(this.id)
        this.injectData('')
      }
    })
  }
  get f() {
    return this.editForm.controls
  }
  injectData(id:string){
    this.jobsService.getJob(this.id).subscribe(
      (data) => {
        console.log(data)
        this.job = data
        this.name = data.name

      }
    )
  }

  updateJob() {
    this.isSend = true

    if (this.editForm.invalid) {
      console.log('El formulario NO es válido')
      return
    }
    console.log('El formulario es válido')
    this.activeRoute.params.subscribe((route) => {
      if (route.id == null) {
        const job: Job = new Job()
        job.name = this.f.name.value
        job.description = this.f.description.value
        job.localization = this.f.lozcalization.value
        job.city = this.f.city.value
        job.type = this.f.type.value
        console.log(job.name)
        this.jobsService.saveJob(job).subscribe(
          (data) => {
            console.log('El trabajo ha sido añadido al listado', data)
          },
          (error) => {
            console.log('Error:', error)
          },
        )
        //this.router.navigate(['/dashboard'])
      } else {

        const job: Job = new Job()
        job._id= this.id
        job.name = this.f.name.value
        job.description = this.f.description.value
        job.localization = this.f.localization.value
        job.city = this.f.city.value
        job.type = this.f.type.value
        this.jobsService.updateJob(job).subscribe(
          (data) => {
            console.log('El trabajo ha sido actualizado correctamente', data)
          },
          (error) => {
            console.log('Error:', error)
          },
        )
      }
      this.router.navigate(['/user'])
    })
  }

  updated() {
    this.router.navigate(['/user'])
  }
  formatDate(){}
}

