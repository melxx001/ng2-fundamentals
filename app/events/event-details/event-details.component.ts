import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';
import { Event } from '../shared/index';

@Component({
    styles: [`
        .container { padding-left: 20px; padding-right: 20px }
        .event-image { height: 100px; }
    `],
    template: `
        <div class="container">
            <img [src]="event?.imageUrl" [alt]="event?.name" class="event-image">

            <div class="row">
                <div class="col-md-11">
                <h2>{{event?.name}} </h2>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                <div><strong>Date:</strong> {{event?.date}}</div>
                <div><strong>Time:</strong> {{event?.time}}</div>
                <div><strong>Price:</strong> \${{event?.price}}</div>
                </div>
                <div class="col-md-6">
                <address>
                    <strong>Address:</strong><br />
                    {{event?.location?.address}}<br />
                    {{event?.location?.city}}, {{event?.location?.country}}
                </address>
                </div>
            </div>

            <hr>

            <session-list [sessions]="event?.sessions"></session-list>
        </div>
    `
})
export class EventDetailsComponent implements OnInit {
    event: Event

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.event = this.eventService.getEvent(
            +this.route.snapshot.params['id']
        );
    }
}