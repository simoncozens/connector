import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private loginUrl = 'http://127.0.0.1:3000/login';

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  constructor(public http: Http) { }

  loggedIn() {
    console.log("Checking token")
    return tokenNotExpired();
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