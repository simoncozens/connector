import { AuthHttp, AuthConfig } from 'angular2-jwt';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

import { AppSettings } from '../app.settings';

@Injectable()
export class APIService {
  constructor(public authHttp: AuthHttp) { }

  apiCall(url: string,
          method: string = "GET",
          params = {}): Promise<any> {
    return this.authHttp
      .get(url, {method: method, params: params } )
      .toPromise()
  }

}