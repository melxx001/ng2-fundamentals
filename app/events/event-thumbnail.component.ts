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
    <div class="well hoverwell thumbnail">
        <h2>{{event?.name}}</h2>
        <div>Date: {{event?.date}}</div>
        <div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div [style.color]="event?.time === '8:00 am' ? 'pink' : 'lightgreen'">Price: \${{event?.price}}</div>
        <div *ngIf="event?.location">
            <span>Location: {{event?.location?.address}}</span>
            <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
            <div *ngIf="event?.onlineUrl">Online URL: {{event?.onlineUrl}}</div>
        </div>
    </div>
    `
})
export class EventThumbnailComponent {
    @Input() event: any;
    @Output() eventClick = new EventEmitter();
    
    getStartTimeClass() {
        const earlyStart = this.event && this.event.time === '8:00 am';
        return {
            yellow: earlyStart, 
            bold: earlyStart
        }
    }
}