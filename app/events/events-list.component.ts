import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import { ToastrService } from '../common/toastr.service';
import { Event } from './shared/index';

@Component({
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
    events: Event[]

    constructor(
        private eventService: EventService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {}

    handleEventClicked(data) {
        this.toastr.success(data);
    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events'];
    }
}