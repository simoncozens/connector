// This is about messages in the sense of mails sent through the system
import { Injectable } from '@angular/core';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AppSettings } from '../app.settings';
import { PagedResults } from '../classes/pagedresults';
import { APIService } from './api.service';

import 'rxjs/add/operator/toPromise';

import { Message } from '../classes/message';

@Injectable()
export class MessageService extends APIService {
  // Define the routes we are going to interact with
  private inboxUrl = AppSettings.API_ENDPOINT + '/messages';
  private sendMessageUrl = AppSettings.API_ENDPOINT + '/messages/send/';
  private threadUrl = AppSettings.API_ENDPOINT + '/messages/with/';
  private unreadUrl = AppSettings.API_ENDPOINT + '/messages/total_unread';

  getThread(id: string, page: number = 1) {
    return this.authHttp
      .get(this.threadUrl + id,
        {method: 'GET',
          params: {'page': page}
        }
      ).toPromise().then(response => response.json() as PagedResults<Message>)
      .catch(this.handleError);
  }

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

  sendMessage(toUser, message): Promise<any> {
    return this.authHttp
      .get(this.sendMessageUrl + toUser,
        {method: 'POST',
        params: {message: message}
        }
      )
      .toPromise()
  }

  readMessage(message): Promise<any> {
    return this.apiCall(this.inboxUrl + '/' + message + '/read')
  }

  unreadCount() {
    return this.apiCall(this.unreadUrl)
      .then(response => response.json().count)
      .catch(this.handleError);
  }
  // Implement a method to handle errors if any
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
