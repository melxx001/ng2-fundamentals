import { Router } from '@angular/router';
import { Component  } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    template: `
        <h1>Login</h1>
        <hr>
        <div class="col-md-4">
        <form #loginForm="ngForm" (ngSubmit)="login(loginForm)" autocomplete="off">
            <div class="form-group" >
            <label for="userName">User Name:</label>
            <input (ngModel)="userName" name="userName" id="userName" type="text" class="form-control" placeholder="User Name..." />
            </div>
            <div class="form-group" >
            <label for="password">Password:</label>
            <input (ngModel)="password" name="password" id="password" type="password" class="form-control"placeholder="Password..." />
            </div>
                
            <button type="submit" class="btn btn-primary">Login</button>
            <button type="button" (click)="cancel()" class="btn btn-default">Cancel</button>
        </form>
        </div>
    `
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router) {}

    login(formValues) {
        this.authService.loginUser(formValues.userName, formValues.password);
        this.router.navigate(['events']);
    }

    cancel() {
        this.router.navigate(['events']);
    }
}