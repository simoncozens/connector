import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule, BsDropdownModule, AlertModule } from 'ngx-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { PeopleComponent, FollowsComponent, RecentComponent } from './pages/people/people.component';
import { PersonComponent } from './pages/person/person.component';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { EditProfileComponent } from './pages/editprofile/editprofile.component';

import { PersonService } from './services/person.service';
import { AuthModule } from './services/auth.module';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PeopleComponent, FollowsComponent,
    PersonComponent, RecentComponent,
    LoginComponent,
    HomeComponent,
    EditProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    InfiniteScrollModule,
    HttpModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(), AlertModule.forRoot(),
    NgxPaginationModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [ PersonService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
