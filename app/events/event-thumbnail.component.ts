import { Component, EventEmitter, Input, Output, style } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    styles: [`
        .thumbnail { min-height: 210px; }
        .pad-left { padding-left: 20px; }
        .well div { color: red }
        .yellow { color: yellow !important;}
    `],
    template: `
    <div class="well hoverwell thumbnail">
        <h2>{{event?.name}}</h2>
        <div>Date: {{event?.date}}</div>
        <div [class.yellow]="event?.time === '8:00 am'" [ngSwitch]="event?.time">
            Time: {{event?.time}}
            <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
            <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
            <span *ngSwitchDefault>(Normal Start)</span>
        </div>
        <div>Price: \${{event?.price}}</div>
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
    
}