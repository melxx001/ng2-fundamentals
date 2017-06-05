import { NgModule, Provider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { VoterService } from './events/event-details/voter.service';
import './rxjs-extentions';

import {
  CreateEventComponent,
  CreateSessionComponent,
  DurationPipe,
  EventDetailsComponent,
  EventResolver,
  EventService,
  EventsListComponent,
  EventsListResolve,
  EventThumbnailComponent,
  LocationValidatorDirective,
  SessionListComponent,
  UpvoteComponent
} from './events/index';

import {
  CollapsibleWellComponent,
  JQ_TOKEN,
  ModalTriggerDirective,
  SimpleModalComponent,
  Toastr,
  TOASTR_TOKEN
} from './common/index';
import { Error404Component } from './errors/404.component';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/nav-bar.component';
import { appRoutes } from './routes';
import { AuthService } from './user/auth.service';

const toastr = window['toastr'];
const jQuery = window['$'];

@NgModule({
  imports: [
    HttpModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavBarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidatorDirective,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr },
    { provide: JQ_TOKEN, useValue: jQuery },
    EventsListResolve,
    { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState },
    AuthService,
    VoterService,
    EventResolver
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule {}
export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('Do you want to cancel? You did not save the event');
  }

  return true;
}
