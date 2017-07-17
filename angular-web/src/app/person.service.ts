import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Person } from './person';

@Injectable()
export class PersonService {
  // Define the routes we are going to interact with
  private peopleListUrl = 'http://127.0.0.1:3000/people.json';

  constructor(private http: Http) { }

  getPeople(page: number = 1) {
    return this.http
      .get(this.peopleListUrl,
        {method: "GET",
        params: {page: page}
        }
      )
      .toPromise()
      .then(response=>response.json() as Person[])
      .catch(this.handleError);
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}