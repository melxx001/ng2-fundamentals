import { Component, Input, OnChanges } from '@angular/core';

import { AuthService } from '../../user/auth.service';
import { Sessions } from '../shared/index';
import { VoterService } from './voter.service';

@Component({
    selector: 'session-list',
    template: `
    <div class="row" *ngFor="let session of visibleSessions">
        <div class="col-md-1">
            <div *ngIf="auth.isAuthenticated()">
                <upvote (vote)="toggleVote(session)" [count]="session?.voters?.length" [voted]="userHasVoted(session)"></upvote>
            </div>
        </div>
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
    `,
})
export class SessionListComponent implements OnChanges {
    @Input() sessions: Sessions[];
    @Input() filterBy: string;
    @Input() sortBy: string;
    @Input() eventId: number;
    visibleSessions: Sessions[] = [];

    constructor(private auth: AuthService, private voterService: VoterService) { }

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy);
            this.sortSessions(this.sortBy);
        }
    }

    sortSessions(sort: string): void {
        if (sort === 'votes') {
            this.visibleSessions = this.visibleSessions.sort((a, b) => {
                return b.voters.length - a.voters.length;
            });
        } else {
            this.visibleSessions = this.visibleSessions.sort((a, b) => {
                const nameA = a.name.toLowerCase();
                const nameB = b.name.toLowerCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }

                // names are equal
                return 0;
            });
        }
    }
    filterSessions(filter: string): void {
        if (filter === 'all') {
            this.visibleSessions = [...this.sessions];
        } else {
            this.visibleSessions = this.sessions.filter((session) => {
                return session.level.toLowerCase() === filter;
            });
        }
    }

    toggleVote(session: Sessions) {
        if (this.userHasVoted(session)) {
            this.voterService.deleteVoter(this.eventId, session, this.auth.currentUser.userName);
        } else {
            this.voterService.addVoter(this.eventId, session, this.auth.currentUser.userName);
        }

        this.sortSessions(this.sortBy);
    }

    userHasVoted(session: Sessions) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName);
    }
}
