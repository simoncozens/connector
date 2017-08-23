import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { PeopleComponent, FollowsComponent, RecentComponent } from './people.component';
import { PersonComponent } from './person.component';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
import { EditProfileComponent } from './editprofile.component';

import { PersonService } from './person.service';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';
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
    BsDropdownModule.forRoot(),
    NgxPaginationModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [ PersonService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
