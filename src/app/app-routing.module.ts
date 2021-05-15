import { LoginComponent } from './Login/Login.component';
import { JobDetailComponent } from './Job-detail/Job-detail.component';
import { ProfileComponent } from './Profile/Profile.component';
import { SearchComponent } from './Search/Search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "search", component: SearchComponent},
  {path: "user/profile", component: ProfileComponent},
  {path: "company/profile", component: ProfileComponent},
  {path: "job/:id", component: JobDetailComponent},

  {path: "signup", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
