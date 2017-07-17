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
    return tokenNotExpired();
  }
  tryLogin(credentials: object) {
    console.log(credentials)
    return this.http.post(
      this.loginUrl,
      JSON.stringify(credentials),
      {headers: this.headers}
    ).toPromise()
    .then(response=>console.log(response))
    .catch(this.handleError);
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}