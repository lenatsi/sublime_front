import { Apply } from './../../models/apply.model'
import { JobsService } from 'src/app/services/jobs/jobs.service'
import { UserService } from './../../services/user/user.service'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  //Constantes a usar en perfil
  nombre = ''
  apellidos = ''
  photo = ''
  email = ''
  bio = ''
  abilities = ''

  applied: Array<Apply> = []
  nombreVacante = ''
  empresaAnuncio = ''
  lugarOferta = ''
  ciudadOferta = ''
  tipoContrato = ''
  fechaApply = ''
  fotoEmpresa = ''
  _id = ''

  //falta experiencia y educación

  constructor(
    private router: Router,
    private userService: UserService,
    private jobService: JobsService,
  ) {}

  ngOnInit() {
    this.userService.userDetail().subscribe(
      (data) => {
        console.log(data)
        console.log(data.data.nombre)
        this.nombre = data.data.nombre
        this.apellidos = data.data.apellidos
        this.abilities = data.data.abilities
        this.bio = data.data.bio
        this.photo = data.data.photo
        this.email = data.data.email

        const jobs = data.jobs

        this.applied = []
        for (const job of jobs) {
          const id = job.job
          this.fechaApply = job.savedAt

          this.jobService.getJob(id).subscribe((data) => {
            const aplicado = new Apply()
            aplicado.nombreVacante = data.name
            aplicado.fotoEmpresa = data.publishedBy.photo
            aplicado.empresaAnuncio = data.publishedBy.nombre
            aplicado.lugarOferta = data.localization
            aplicado.ciudadOferta = data.city
            aplicado.tipoContrato = data.type
            aplicado._id = data._id
            aplicado.fechaApply = this.fechaApply
            this.applied.push(aplicado)
          })
        }console.log(this.applied)
      },
      (error) => {
        console.log('Error: ', error)
      },
    )
  }

  formatDate(date?: string): string {
    return moment(date).locale('es-es').format('DD/MM/YYYY')
  }
}
