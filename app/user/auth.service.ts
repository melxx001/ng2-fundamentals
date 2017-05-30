import {
    Headers,
    Http,
    RequestOptions,
    Response
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/RX';
import { User } from './user.model';

@Injectable()
export class AuthService {
    currentUser: User;

    constructor(private http: Http) { }

    loginUser(userName: string, password: string): Observable<any> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });
        const loginInfo = { username: userName, password };

        return this.http.post('api/login', loginInfo, options)
            .do((resp: Response) => {
                if (resp) {
                    this.currentUser = <User>resp.json().user;
                }
            }).catch(error => {
                return Observable.of(false);
            });
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }

}