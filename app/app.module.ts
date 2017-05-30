import { HttpModule } from '@angular/http';
import { VoterService } from './events/event-details/voter.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventService,
    EventsListResolve,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe,
    UpvoteComponent,
    LocationValidatorDirective,
    EventResolver
} from './events/index';

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/nav-bar.component';
import { Error404Component } from './errors/404.component';
import {
    CollapsibleWellComponent,
    TOASTR_TOKEN,
    Toastr,
    JQ_TOKEN,
    SimpleModalComponent,
    ModalTriggerDirective
} from './common/index'
import { AuthService } from './user/auth.service';
import { appRoutes } from './routes';

declare let toastr: Toastr;
declare let jQuery: Object;

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
    bootstrap: [
        EventsAppComponent
    ]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('Do you want to cancel? You did not save the event');
    }

    return true;
}