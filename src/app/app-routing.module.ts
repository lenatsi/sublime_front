import { MyListComponent } from './dashboard/my-list/my-list.component';
import { UserDetailsComponent } from './dashboard/user-details/user-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Login/Login.component';
import { JobDetailComponent } from './Job-detail/Job-detail.component';
import { ProfileComponent } from './Profile/Profile.component';
import { SearchComponent } from './Search/Search.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Home/Home.component';
import { JobEditComponent } from './dashboard/job-edit/job-edit.component';
import { AuthGuardService } from './services/auth/auth-guard.service';

const routes: Routes = [
  {path: "", component: HomeComponent, pathMatch: "full"},
  {path: "search", component: SearchComponent},
  {path: "user/profile", component: ProfileComponent},
  {path: "company/profile", component: ProfileComponent},
  {path: "job/:id", component: JobDetailComponent},
  {path: "user", component:DashboardComponent, children:
    [
      { path: "", redirectTo: "myprofile", pathMatch: "full" },
      { path: "myprofile", component: UserDetailsComponent },
      { path: "jobedit", component: JobEditComponent },
      { path: "company", component: MyListComponent}

    ],canActivate: [AuthGuardService],
  },
  {path: "user/myprofile/job/:id", redirectTo:"job/:id"},

  {path: "signin", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
