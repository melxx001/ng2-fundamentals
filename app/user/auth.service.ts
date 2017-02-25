import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable()
export class AuthService {
    currentUser: User;

    loginUser (userName: string, password: string) {
        this.currentUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Smith',
            userName: userName
        }   
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName: string, lastName: string) {
        this.currentUser.firstName = firstName;
        this.currentUser.lastName = lastName;
    }
}