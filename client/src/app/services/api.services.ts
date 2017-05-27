import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {
  public apiUrl = 'https://api.twitchlolrank.com';
//  public apiUrl = 'http://localhost:3000';

  constructor (public http: Http) {
  }

  getTwitchUser(twitchUsername: String): Observable<any> {
    return this.http.get(this.apiUrl + '/users/' + twitchUsername)
                    .map(data => this.extractData(data));
  }

  claimAccount(twitchAuthCode: String, urlHash: String)
  {
    return this.http.get(this.apiUrl + '/claim/' + urlHash + '/' + twitchAuthCode)
      .map(data => this.extractData(data));
  }

  /*vote(name: string) {
    return this.http.post(this.apiUrl + 'streams/'+ name + '/vote', {})
              .map(function(result) {
                return (result);
              })
              .catch(this.handleError);
  }*/

  public extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
