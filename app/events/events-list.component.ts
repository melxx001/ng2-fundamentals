import { Component } from '@angular/core';

@Component({
    selector: 'events-list',
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        <hr>
        <event-thumbnail #thumbnail (eventClick)="handleEventClicked($event)" [event]="event1"></event-thumbnail>
        <button class="btn btn-primary" (click)="thumbnail.logFoo()">Log foo</button>
        <h3>{{thumbnail.someProperty}}</h3>
    </div>
    `
})
export class EventsListComponent {
    event1 = {
        id: 1,
        name: 'Angular Connect',    
        date: '9/26/2026',
        time: '10:00 am',
        price: 5999.99,
        imageUrl: '/app/assets/images/angularconnect-shield.png',
        location: {
            address: '1057 DT',
            city: 'London',
            country: 'England'
        }
    }

    handleEventClicked(data: any) {
        console.log('received', data)
    }
}