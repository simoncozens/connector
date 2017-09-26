import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppSettings } from '../app.settings';
import { PagedResults } from '../classes/pagedresults';

import 'rxjs/add/operator/toPromise';

import { Message } from '../classes/message';

@Injectable()
export class MessageService {
  // Define the routes we are going to interact with
  private inboxUrl = AppSettings.API_ENDPOINT + '/messages';

  constructor(public authHttp: AuthHttp) { }

  getInbox(page: number = 1, params = {}, url = this.inboxUrl) {
    const myParams: any = Object.assign({'page': page}, params);
    return this.authHttp
      .get(url,
        {method: 'GET',
        params: myParams
        }
      )
      .toPromise()
      .then(response => response.json() as PagedResults<Message>)
      .catch(this.handleError);
  }

  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
