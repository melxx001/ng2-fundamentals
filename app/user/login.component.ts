import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
    styles: [`
        em { float: right; color: red; padding-left: 10px; }
    `],
    template: `
        <h1>Login</h1>
        <hr>
        <div class="col-md-4">
            <form #loginForm="ngForm" (ngSubmit)="login(loginForm)" autocomplete="off" novalidate>
                <div class="form-group" >
                    <label for="userName">User Name:</label>
                    <em *ngIf="loginForm.controls.userName?.invalid && (loginForm.controls.userName?.touched || mouseoverLogin)">Required</em>
                    <input required (ngModel)="userName" name="userName" id="userName" type="text" class="form-control" placeholder="User Name..." />
                </div>
                <div class="form-group" >
                    <label for="password">Password:</label>
                    <em *ngIf="loginForm.controls.password?.invalid && (loginForm.controls.password?.touched || mouseoverLogin)">Required</em>
                    <input required (ngModel)="password" name="password" id="password" type="password" class="form-control"placeholder="Password..." />
                </div>
                    
                <span (mouseenter)="mouseoverLogin=true" (mouseleave)="mouseoverLogin=false">
                    <button type="submit" [disabled]="loginForm.invalid" class="btn btn-primary">Login</button>
                </span>
                <button type="button" (click)="cancel()" class="btn btn-default">Cancel</button>
            </form>
            <br>
            <div *ngIf="loginInvalid" class="alert alert-danger">Invalid Login Info</div> 
        </div>
    `
})
export class LoginComponent {
    loginInvalid = false;

    constructor(private authService: AuthService, private router: Router) { }

    login(formValues) {
        this.authService.loginUser(formValues.value.userName, formValues.value.password).subscribe(resp => {
            if (!resp) {
                this.loginInvalid = true;
            } else {
                this.loginInvalid = false;
                this.router.navigate(['events']);
            }
        });
    }

    cancel() {
        this.router.navigate(['events']);
    }
}