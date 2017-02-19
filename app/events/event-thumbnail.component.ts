import { Component, EventEmitter, Input, Output, style } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    styles: [`
        .thumbnail { min-height: 210px; }
        .pad-left { padding-left: 20px; }
        .well div { color: red }
    `],
    template: `
    <div class="well hoverwell thumbnail">
        <h2>{{event.name}}</h2>
        <div>Date: {{event.date}}</div>
        <div>Time: {{event.time}}</div>
        <div>Price: \${{event.price}}</div>
        <div>
            <span>Location: {{event.location.address}}</span>
            <span class="pad-left">{{event.location.city}}, {{event.location.country}}</span>
        </div>
    </div>
    `
})
export class EventThumbnailComponent {
    @Input() event: any;
    @Output() eventClick = new EventEmitter();
    
}