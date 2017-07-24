import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

import { Person } from './person';

@Injectable()
export class PersonService {
  // Define the routes we are going to interact with
  private peopleListUrl = 'http://127.0.0.1:3000/people.json';
  private personShowUrl = 'http://127.0.0.1:3000/people/';

  constructor(public authHttp: AuthHttp) { }

  getPeople(page: number = 1, params = {}) {
    var myParams:any = Object.assign({"page": page},params);
    return this.authHttp
      .get(this.peopleListUrl,
        {method: "GET",
        params: myParams
        }
      )
      .toPromise()
      .then(response=>response.json() as Person[])
      .catch(this.handleError);
  }

  getPerson(id: string) {
    return this.authHttp
      .get(this.personShowUrl+id)
      .toPromise()
      .then(response=>response.json() as Person)
      .catch(this.handleError);
  }


  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}