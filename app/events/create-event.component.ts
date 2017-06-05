import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from './shared/index';

@Component({
  styles: [
    `
        em { float: right; color: red; padding-left: 10px }
        .error input { background-color: red; }
        .error ::-webkit-input-placeholder { color: #999 }
        .error ::-moz-placeholder { color: #999 }
        .error :-moz-placeholder { color: #999 }
        .error :ms-input-placeholder { color: #999 }
    `
  ],
  template: `
        <h1>New Event</h1>
        <hr>
        <div class="col-md-6">
            <form #newEventForm="ngForm" (ngSubmit)="saveEvent(newEventForm.value)" autocomplete="off" novalidate>
                <div class="form-group" [ngClass]="{'error': newEventForm.form.get('name')?.invalid && newEventForm.form.get('name')?.touched}">
                    <label for="eventName">Event Name:</label>
                    <em *ngIf="newEventForm.form.get('name')?.invalid && (newEventForm.form.get('name')?.touched)">Required</em>
                    <input (ngModel)="name" name="name" required id="name" type="text" class="form-control" placeholder="Name of your event..." />
                </div>
                <div class="form-group" [ngClass]="{'error': newEventForm.form.get('date')?.invalid && newEventForm.form.get('date')?.touched}">
                    <label for="eventDate">Event Date:</label>
                    <em *ngIf="newEventForm.form.get('date')?.invalid && (newEventForm.form.get('date')?.touched)">Required</em>
                    <input (ngModel)="date" name="date" required id="eventDate" type="text" class="form-control" placeholder="format (mm/dd/yyyy)..." />
                </div>
                <div class="form-group" [ngClass]="{'error': newEventForm.form.get('time')?.invalid && newEventForm.form.get('time')?.touched}">
                    <label for="eventTime">Event Time:</label>
                    <em *ngIf="newEventForm.form.get('time')?.invalid && (newEventForm.form.get('time')?.touched)">Required</em>
                    <input (ngModel)="time" name="time" required id="eventTime" type="text" class="form-control" placeholder="start and end time..." />
                </div>
                <div class="form-group" [ngClass]="{'error': newEventForm.form.get('price')?.invalid && newEventForm.form.get('price')?.touched}">
                    <label for="eventPrice">Event Price:</label>
                    <em *ngIf="newEventForm.form.get('price')?.invalid && (newEventForm.form.get('price')?.touched)">Required</em>
                    <input (ngModel)="price" name="price" required id="eventPrice" type="text" type="number" class="form-control" placeholder="event price..." />
                </div>
                
                <div ngModelGroup="location" #locationGroup="ngModelGroup" validateLocation>
                    <div class="form-group">
                        <label for="address">Event Location:</label>
                        <em *ngIf="locationGroup?.invalid && locationGroup?.touched">You must enter the full location OR an online URL</em>
                        <input (ngModel)="address" name="address" id="address" type="text" class="form-control" placeholder="Address of event..." />
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <input (ngModel)="city" name="city" id="city" type="text" class="form-control" placeholder="City..." />
                        </div>
                        <div class="col-md-6" >
                            <input (ngModel)="country" name="country" id="country" type="text" class="form-control" placeholder="Country..." />
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="onlineUrl">Online Url:</label>
                    <input (ngModel)="onlineUrl" (change)="locationGroup.control.controls.address.updateValueAndValidity()" name="onlineUrl" id="onlineUrl" type="text" class="form-control" placeholder="Online Url..." />
                </div>

                <div class="form-group" [ngClass]="{'error': newEventForm.form.get('imageUrl')?.invalid && newEventForm.form.get('imageUrl')?.touched}">
                    <label for="imageUrl">Image:</label>
                    <em *ngIf="newEventForm.form.get('imageUrl')?.invalid && newEventForm.form.get('imageUrl')?.touched && newEventForm.form.get('imageUrl')?.errors.required">Required</em>
                    <em *ngIf="newEventForm.form.get('imageUrl')?.invalid && newEventForm.form.get('imageUrl')?.touched  && newEventForm.form.get('imageUrl')?.errors.pattern">Must be a png or jpg url</em>
                    <input (ngModel)="imageUrl" name="imageUrl" required pattern=".*\/.*.(png|jpg)" id="imageUrl" type="text" class="form-control" placeholder="url of image..." />
                    <img [src]="newEventForm.form.get('imageUrl').value" *ngIf="newEventForm.form.get('imageUrl?').valid"/>
                </div>
                
                <button type="submit" [disabled]="locationGroup.invalid" class="btn btn-primary">Save</button>
                <button type="button" class="btn btn-default" (click)="cancel()">Cancel</button>
            </form>
        </div>
    `
})
export class CreateEventComponent {
  isDirty = true;
  public imageUrl: string;
  public price: string;
  public time: string;
  public date: string;
  public name: string;
  public address: string;
  public onlineUrl: string;
  public city: string;
  public country: string;

  constructor(private router: Router, private eventService: EventService) {}

  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues).subscribe(event => {
      this.isDirty = false;
      this.router.navigate(['/events']);
    });
  }
}
