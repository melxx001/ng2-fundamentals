import { Component, EventEmitter, Input, Output, style } from '@angular/core';

@Component({
    selector: 'event-thumbnail',
    styles: [`
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
        <button class="btn btn-primary" (click)="handleClickMe()">Click Me</button>
    </div>
    `
})
export class EventThumbnailComponent {
    @Input() event: any;
    @Output() eventClick = new EventEmitter();
    someProperty: any = "Some value";

    logFoo() {
        console.log('foo');
    }

    handleClickMe() {
        console.log('clicked');
        this.eventClick.emit(this.event.name);
    }
    
}