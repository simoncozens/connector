import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginComponent } from '../pages/login/login.component';
import { PeopleComponent } from '../pages/people/people';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PersonService } from '../services/person.service';
import { AuthModule } from '../services/auth.module';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../services/auth-guard.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    PeopleComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    PeopleComponent,
    LoginComponent
  ],
  providers: [
    PersonService, AuthService, AuthGuard,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
