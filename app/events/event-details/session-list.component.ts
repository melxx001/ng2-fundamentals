import { Component, Input } from '@angular/core';

import { Sessions } from '../shared/index';

@Component({
    selector: 'session-list',
    template: `
    <div class="row" *ngFor="let session of sessions">
        <div class="col-md-10">
            <collapsible-well [title]="session.name">
                <h6>{{session.presenter}}</h6>
                <span>Duration: {{session.duration}}</span><br />
                <span>Level: {{session.level}}</span>
                <p>{{session.abstract}}</p>
            </collapsible-well>
        </div>
    </div>
    `
})
export class SessionListComponent {
    @Input() sessions: Sessions;


}