import { Component } from '@angular/core';

import { EventService, Sessions } from '../events/index';
import { AuthService } from '../user/auth.service';

@Component({
    selector: 'nav-bar',
    styles: [`
        .nav.nabar-nav { font-size: 15px; }
        #searchForm { margin-right: 100px }
        @media (max-width: 1200px) { #searchForm { display: none; } }
        li > a.active { color: #F97924; }
    `],
    template: `
        <div class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                <a class="navbar-brand" >ngEvents</a>
                </div>

                <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    <li>
                    <a [routerLink]="['/events']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">All Events</a>
                    </li>
                    <li><a [routerLink]="['/events/new']" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Create Event</a></li>
                    <li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" >
                        Events
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li >
                        <a href="">Angular Connect</a>
                        </li>
                    </ul>
                    </li>
                </ul>
                <div class="navbar-header navbar-right">
                    <ul class="nav navbar-nav">
                    <li>
                        <a [routerLink]="['user/login']" *ngIf="!auth.isAuthenticated()">Login</a>
                        <a [routerLink]="['user/profile']" *ngIf="auth.isAuthenticated()">Welcome {{ auth.currentUser.firstName }}</a>
                    </li>
                    </ul>
                </div>
                <form id="searchForm" (ngSubmit)="searchSessions(searchTerm)" class="navbar-form navbar-right"  >
                    <div class="form-group">
                    <input [(ngModel)]="searchTerm" name="searchTerm" type="text" class="form-control" placeholder="Search Sessions" >
                    </div>
                    <button class="btn btn-default" modal-trigger="searchResults">   
                    Search
                    </button>
                </form>
                </div>
            </div>
        </div>
        <simple-modal closeOnBodyClick="true" elementId="searchResults" title="Matching Sessions">
            <div class="list-group">
                <a class="list-group-item" *ngFor="let session of foundSessions" [routerLink]="['/events', session.eventId]">{{session.name}}</a>
            </div>
        </simple-modal>
    `,
})
export class NavBarComponent {
    searchTerm = '';
    foundSessions: Sessions[];
    constructor(public auth: AuthService, private eventService: EventService) { }

    searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm).subscribe((sessions) => {
            this.foundSessions = sessions;
        });
    }
}
