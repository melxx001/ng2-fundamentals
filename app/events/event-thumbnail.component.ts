import { Component, EventEmitter, Input, Output, style } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    styles: [`
        .thumbnail { min-height: 210px; }
        .pad-left { padding-left: 20px; }
        .well div { color: red }
        .lightgreen { color: lightgreen !important;}
        .yellow { color: yellow !important;}
        .pink { color: pink !important;}
        .bold { font-weight: bold;}
    `],
    template: `
    <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
        <h2>{{event?.name | uppercase}}</h2>
        <div>Date: {{event?.date | date: 'shortDate'}}</div>
        <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div [ngStyle]="getStartTimeStyle()">Price: {{event?.price | currency: 'USD': true}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            <div *ngIf="event?.onlineUrl">Online URL: {{event?.onlineUrl}}</div>
        </div>
    </div>
    `,
})
export class EventThumbnailComponent {
    @Input() event: any;
    @Output() eventClick = new EventEmitter();

    getStartTimeClass(): any {
        const earlyStart = this.event && this.event.time === '8:00 am';
        return {
            yellow: earlyStart,
            bold: earlyStart,
        };
    }

    getStartTimeStyle(): any {
        const earlyStart = this.event && this.event.time === '8:00 am';

        return {
            'color': earlyStart ? 'pink' : 'lightgreen',
            'font-weight': earlyStart ? 'normal' : 'bold',
        };
    }
}
