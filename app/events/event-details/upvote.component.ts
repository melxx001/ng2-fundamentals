import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  styles: [
    `
        .votingWidgetContainer {
            padding-left:24px;
        }

        .votingWidget {
            height: 64px;
            padding-top: 7px;
            border-radius: 21px;
        }

        .votingButton {
            margin-left: -7px;
            margin-top: 1px;
            cursor:pointer;
        }

        .votingButton i {
            color: white;
        }

        .badge-inverse {
            background-color: #fff;
            color: #4e5d6c;
        }

        .votingCount {
            margin-left: -11px;
            margin-top: 1px;
            font-weight: bold;
            font-size: 14px;
        }
    `
  ],
  template: `
        <div class="votingWidgetContainer pointable" (click)="onClick()">
            <div class="votingButton">
                <i class="glyphicon glyphicon-heart" [style.color]="iconColor"></i>
            </div>
            <div class="badge badge-inverse votingCount">
                <div>{{count}}</div>
            </div>
        </div>
    `
})
export class UpvoteComponent {
  @Input()
  set voted(val) {
    this.iconColor = val ? 'red' : 'white';
  }
  @Input() count = 0;
  @Output() vote = new EventEmitter();
  iconColor: string;

  onClick() {
    this.vote.emit({});
  }
}
