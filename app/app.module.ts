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
    EventRouteActivator,
    EventsListResolve,
    CreateSessionComponent,
    SessionListComponent,
    DurationPipe
} from './events/index';

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/nav-bar.component';
import { Error404Component } from './errors/404.component';
import { CollapsibleWellComponent } from './common/collapsible-well.component';
import { TOASTR_TOKEN, Toastr } from './common/toastr.service';
import { AuthService } from './user/auth.service';
import { appRoutes } from './routes';

declare let toastr: Toastr;

@NgModule({
    imports: [
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
        DurationPipe
    ],
    providers: [
        EventService,
        {
            provide: TOASTR_TOKEN,
            useValue: toastr
        },
        EventRouteActivator,
        EventsListResolve,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        AuthService
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