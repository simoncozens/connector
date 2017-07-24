import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { PeopleComponent } from './people.component';
import { NavbarComponent } from './navbar.component';
import { LoginComponent } from './login.component';
import { HomeComponent } from './home.component';
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
    PeopleComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ModalModule.forRoot(),
    NgxPaginationModule,
    AuthModule,
    ReactiveFormsModule
  ],
  providers: [ PersonService, AuthService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
