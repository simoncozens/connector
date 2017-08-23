import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppSettings } from './app.settings';
import { PagedResults } from './pagedresults';

import 'rxjs/add/operator/toPromise';

import { Person } from './person';

@Injectable()
export class PersonService {
  // Define the routes we are going to interact with
  private peopleListUrl = AppSettings.API_ENDPOINT + '/people.json';
  private personUrl = AppSettings.API_ENDPOINT + '/people/';
  private followUrl = AppSettings.API_ENDPOINT + '/people/following';
  private recentUrl = AppSettings.API_ENDPOINT + '/people/recent';

  constructor(public authHttp: AuthHttp) { }

  getPeople(page: number = 1, params = {}, url = this.peopleListUrl) {
    const myParams: any = Object.assign({'page': page}, params);
    return this.authHttp
      .get(url,
        {method: 'GET',
        params: myParams
        }
      )
      .toPromise()
      .then(response => response.json() as PagedResults<Person>)
      .catch(this.handleError);
  }

  getFollows(page: number = 1) {
    return this.getPeople(page, {}, this.followUrl);
  }
  getRecent(page: number = 1) {
    return this.getPeople(page, {}, this.recentUrl);
  }

  getPerson(id: string) {
    return this.authHttp
      .get(this.personUrl + id)
      .toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);
  }

  follow(id: string) {
    return this.authHttp.get(this.personUrl + id + '/follow')
      .toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);

  }

  unfollow(id: string) {
    return this.authHttp.get(this.personUrl + id + '/unfollow')
      .toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);

  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
