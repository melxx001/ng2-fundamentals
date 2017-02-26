import { Router } from '@angular/router';
import { FormControlName } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  styles: [`
    em { float: right; color: red; padding-left: 10px }
    .error input { background-color: red; }
    .error ::-webkit-input-placeholder { color: #999 }
    .error ::-moz-placeholder { color: #999 }
    .error :-moz-placeholder { color: #999 }
    .error :ms-input-placeholder { color: #999 }
  `],
  template: `
    <div>
      <h1>Edit Your Profile </h1>
      <hr>
      <div class="col-md-4">
        <form [formGroup]="profileForm" (ngSubmit)="saveProfile(profileForm.value)" autocomplete="off" novalidate>
          <div class="form-group" [ngClass]="{ 'error': !validateFirstName() }">
            <label for="firstName">First Name:</label>
            <em *ngIf="!validateFirstName() && profileForm.controls.firstName.errors.required">Required</em>
            <em *ngIf="!validateFirstName() && profileForm.controls.firstName.errors.pattern">Must start with a letter</em>
            <input formControlName="firstName" id="firstName" type="text" class="form-control" placeholder="First Name..." />
          </div>
          <div class="form-group" [ngClass]="{ 'error': !validateLastName() }">
            <label for="lastName">Last Name:</label>
            <em *ngIf="!validateLastName()">Required</em>
            <input formControlName="lastName" id="lastName" type="text" class="form-control" placeholder="Last Name..." />
          </div>

          <button type="submit" class="btn btn-primary">Save</button>
          <button type="button" (click)="cancel()" class="btn btn-default">Cancel</button>
        </form>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
       profileForm: FormGroup;
       firstName: FormControl;
       lastName: FormControl;

       constructor(private authService: AuthService, private router: Router) {}

       ngOnInit() {
         this.firstName = new FormControl(this.authService.currentUser.firstName, [Validators.required, Validators.pattern('[a-zA-Z].*')]);
         this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
         this.profileForm = new FormGroup({
           firstName: this.firstName,
           lastName: this.lastName
         });
       }

       cancel() {
         this.router.navigate(['events']);
       }

       saveProfile(formValues) {
         if (this.profileForm.valid) {
          this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
          this.router.navigate(['events']);
         }
       }

       validateFirstName() {
         return this.firstName.valid || this.firstName.untouched;
       }

       validateLastName() {
         return this.lastName.valid || this.lastName.untouched;
       }
}
