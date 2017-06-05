import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user.model';

@Injectable()
export class AuthService {
  currentUser: User;

  constructor(private http: Http) {}

  loginUser(userName: string, password: string): Observable<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const loginInfo = { username: userName, password };

    return this.http
      .post('api/login', loginInfo, options)
      .do((resp: Response) => {
        if (resp) {
          this.currentUser = resp.json().user as User;
        }
      })
      .catch(error => {
        return Observable.of(false);
      });
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  checkAuthenticationStatus() {
    return this.http
      .get('/api/currentIdentity')
      .map((resp: any) => {
        if (resp._body) {
          return resp.json();
        } else {
          return {};
        }
      })
      .do((currentUser: User) => {
        if (!!currentUser.userName) {
          this.currentUser = currentUser;
        }
      })
      .subscribe();
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  logout() {
    this.currentUser = undefined;
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });

    return this.http.post(`/api/logout`, {}, options);
  }
}
