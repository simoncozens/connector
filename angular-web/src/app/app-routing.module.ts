import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent, FollowsComponent } from './people.component';
import { PersonComponent } from './person.component';
import { EditProfileComponent } from './editprofile.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';

import { AuthGuard } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'person/:id',
    component: PersonComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    data: { title: 'People List' },
    canActivate: [AuthGuard]
  },
  {
    path: 'following',
    component: FollowsComponent,
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomeComponent, },
  { path: 'edit', component: EditProfileComponent, },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
