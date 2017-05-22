import { Component, Input, ViewChild, ElementRef, Inject } from '@angular/core';
import { JQ_TOKEN } from './index';

@Component({
    selector: 'simple-modal',
    styles: [`
        .modal-body {
            height: 250px;
            overflow-y: scroll;
        }
    `],
    template: `
        <div id="{{elementId}}" #modalContainer class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span>&times;</span>
                        </button>
                        <h4 class="modal-title">{{title}}</h4>
                    </div>
                    <div class="modal-body" (click)="closeModal()">
                        <ng-content></ng-content>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class SimpleModalComponent {
    @Input() title: string;
    @Input() elementId: string;
    @ViewChild('modalContainer') containerEl: ElementRef;

    constructor( @Inject(JQ_TOKEN) private $: any) { }

    closeModal() {
        this.$(this.containerEl.nativeElement).modal('hide');
    }
}