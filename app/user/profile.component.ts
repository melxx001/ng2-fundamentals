import { Router } from '@angular/router';
import { FormControlName } from '@angular/forms/src/directives';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { AuthService } from './auth.service';

@Component({
  template: `
    <div>
      <h1>Edit Your Profile </h1>
      <hr>
      <div class="col-md-4">
        <form [formGroup]="profileForm" (ngSubmit)="saveProfile(profileForm.value)" autocomplete="off" novalidate>
          <div class="form-group">
            <label for="firstName">First Name:</label>
            <input formControlName="firstName" id="firstName" type="text" class="form-control" placeholder="First Name..." />
          </div>
          <div class="form-group">
            <label for="lastName">Last Name:</label>
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

       constructor(private authService: AuthService, private router: Router) {}

       ngOnInit() {
         let firstName = new FormControl(this.authService.currentUser.firstName);
         let lastName = new FormControl(this.authService.currentUser.lastName);
         this.profileForm = new FormGroup({
           firstName,
           lastName
         });
       }

       cancel() {
         this.router.navigate(['events']);
       }

       saveProfile(formValues) {
         this.authService.updateCurrentUser(formValues.firstName, formValues.lastName);
         this.router.navigate(['events']);
       }
}
