import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../shared/event.service';
import { Event, Sessions } from '../shared/index';

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
                <h2>{{event?.name | uppercase}} </h2>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                <div><strong>Date:</strong> {{event?.date | date: 'shortDate'}}</div>
                <div><strong>Time:</strong> {{event?.time}}</div>
                <div><strong>Price:</strong> {{event?.price | currency: 'USD': true}}</div>
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

            <div class="row" style="margin-bottom: 10px;">
                <div class="col-md-2">
                    <h3 style="margin: 0;">Sessions</h3>
                </div>
                <div class="col-md-7">
                    <button class="btn btn-default" [class.active]="filterBy==='all'" (click)="filterBy='all'">All</button>
                    <button class="btn btn-default" [class.active]="filterBy==='beginner'" (click)="filterBy='beginner'">Beginner</button>
                    <button class="btn btn-default" [class.active]="filterBy==='intermediate'" (click)="filterBy='intermediate'">Intermediate</button>
                    <button class="btn btn-default" [class.active]="filterBy==='advanced'" (click)="filterBy='advanced'">Advanced</button>
                </div>
                <div class="col-md-2" *ngIf="!addMode">
                    <a href="javascript:void(0);" (click)="addSession()">Add Session</a>
                </div>
            </div>

            <session-list *ngIf="!addMode" [sessions]="event?.sessions"></session-list>
            <create-session *ngIf="addMode" (saveNewSession)="saveNewSession($event)" (cancelAddSession)="cancelAddSession()"></create-session>
        </div>
    `
})
export class EventDetailsComponent implements OnInit {
    event: Event;
    addMode: boolean;
    filterBy: string = 'all';

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.event = this.eventService.getEvent(
            +this.route.snapshot.params['id']
        );
    }

    addSession() {
        this.addMode = true;
    }


    saveNewSession(session: Sessions) {
        session.id = Math.max.apply(null, this.event.sessions.map(s => s.id)) + 1;
        this.event.sessions.push(session);
        this.eventService.updateEvent(this.event);
        this.addMode = false;
    }

    cancelAddSession() {
        this.addMode = false;
    }
}