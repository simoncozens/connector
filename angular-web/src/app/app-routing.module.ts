import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonComponent } from './person.component';

const routes: Routes = [
  {
    path: 'people',
    component: PersonComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/people',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
