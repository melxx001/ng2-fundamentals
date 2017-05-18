import { Component, Input, OnChanges } from '@angular/core';

import { Sessions } from '../shared/index';

@Component({
    selector: 'session-list',
    template: `
    <div class="row" *ngFor="let session of visibleSessions">
        <div class="col-md-10">
            <collapsible-well>
                <div well-title>
                    {{session.name}}
                    <i *ngIf="session.voters.length > 3" class="glyphicon glyphicon-fire" style="color: red;"></i>
                </div>
                <div well-body>
                    <h6>{{session.presenter}}</h6>
                    <span>Duration: {{session.duration | duration}}</span><br />
                    <span>Level: {{session.level}}</span>
                    <p>{{session.abstract}}</p>
                </div>
            </collapsible-well>
        </div>
    </div>
    `
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: Sessions[];
    @Input() filterBy: string;
    visibleSessions: Sessions[] = [];

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
        }
    }

    filterSessions(filter) {
        if (filter === 'all') {
            this.visibleSessions = [...this.sessions];
        } else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLowerCase() === filter;
            });
        }
    }
}