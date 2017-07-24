import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent } from './people.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';

import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'people',
    component: PeopleComponent,
    data: { title: 'People List' },
    canActivate: [AuthGuard]
  },
  { path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
