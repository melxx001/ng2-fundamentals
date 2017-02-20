import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';

@Component({
    selector: 'events-list',
    styles: [`
        .well { color: yellow; }
    `],
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        <hr>
        <div class="well">TEST</div>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail (click)="handleEventClicked(event.name)" [event]="event"></event-thumbnail>        
            </div>
        </div>
    </div>
    `
})
export class EventsListComponent implements OnInit {
    events: any[]

    constructor(
        private eventService: EventService,
        private toastr: ToastrService
    ) {}

    handleEventClicked(data) {
        this.toastr.success(data);
    }

    ngOnInit() {
        this.events = this.eventService.getEvents();
    }
}