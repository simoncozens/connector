import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeopleComponent, FollowsComponent, RecentComponent } from './pages/people/people.component';
import { PersonComponent } from './pages/person/person.component';
import { InboxComponent } from './pages/inbox/inbox.component';
import { EditProfileComponent } from './pages/editprofile/editprofile.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './services/auth-guard.service';

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
  {
    path: 'recent',
    component: RecentComponent,
    canActivate: [AuthGuard]
  },
  { path: 'inbox', component: InboxComponent,
    canActivate: [AuthGuard]
  },
  { path: 'home', component: HomeComponent,
    canActivate: [AuthGuard]
  },
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
