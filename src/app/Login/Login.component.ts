import { UserService } from 'src/app/services/user/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { NotifierService } from 'angular-notifier'
import { Login } from '../models/login.model'

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss'],
})
export class LoginComponent implements OnInit {

  mForm: FormGroup
  isSend = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notifierService: NotifierService,
    private userService: UserService,
  ) {
    this.mForm = fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,8}$')]]
    })
  }

  ngOnInit() {}

  get f() {
    return this.mForm.controls
  }

  login() {
    this.isSend = true
    //console.log('Guardar!!', this.mForm)

    if (this.mForm.invalid) {
      console.error('El formulario NO es válido')
      return
    }
    console.log('El formulario es válido')
    const login: Login = new Login()
    login.email = this.f.email.value
    login.password = this.f.password.value
    this.userService.login(login).subscribe(
      (data) => {
        //console.log(data.access_token)
        //guardar token
        this.notifierService.notify('success', 'Datos actualizados')
        localStorage.setItem('token', data.access_token)

        if (data.role == 'company'){
          this.router.navigate(['/user/company'])
        }else {
          this.router.navigate(['/user/myprofile'])
        }

      },
      (error) => {
        console.log('Error:', error)
      },
    )

  }
  signup() {
    this.router.navigate(['/register'])
  }
}
