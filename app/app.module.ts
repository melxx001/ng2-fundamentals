import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    CreateEventComponent,
    EventService,
    EventRouteActivator,
    EventsListResolve
} from './events/index';

import { EventsAppComponent } from './events-app.component'
import { NavBarComponent } from './nav/nav-bar.component';
import { Error404Component } from './errors/404.component';
import { ToastrService } from './common/toastr.service';
import { appRoutes } from './routes';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        Error404Component
    ],
    providers: [
        EventService,
        ToastrService,
        EventRouteActivator,
        EventsListResolve,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        }
    ],
    bootstrap: [
        EventsAppComponent
    ]
})
export class AppModule {}

function checkDirtyState(component: CreateEventComponent) {
    if (component.isDirty) {
        return window.confirm('Do you want to cancel? You did not save the event');
    }

    return true;
}