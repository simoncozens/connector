import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Person } from './person';
import { AppSettings } from './app.settings';

@Injectable()
export class AuthService {
  private loginUrl = AppSettings.API_ENDPOINT+'/login';

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http) { }

  loggedIn() {
    return tokenNotExpired();
  }

  loggedInUser() :Person {
    let p:Person = JSON.parse(localStorage.getItem("myself"))
    // If no p, then get one via JSON
    return p
  }

  setLoggedInUser(p: Person) {
    console.log(p)
    localStorage.setItem("myself", JSON.stringify(p))
  }

  stashJWT(response: string) {
    localStorage.setItem("token", response)
  }

  logOut() {
    localStorage.removeItem("token")
  }
  
  makeLoginAttempt(credentials: any): Promise<any> {
    return this.http.post(
      this.loginUrl,
      JSON.stringify(credentials),
      {headers: this.headers}
    ).toPromise()
  }
}