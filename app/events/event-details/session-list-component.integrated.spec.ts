import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './../../user/auth.service';
import { DebugElement, Component } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { Sessions } from './../shared/event.model';
import { VoterService } from './voter.service';
import { By } from '@angular/platform-browser';

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(
    async(() => {
      let mockAuthService = {};
      let mockVoterService = {};

      TestBed.configureTestingModule({
        imports: [],
        declarations: [SessionListComponent],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          { provide: VoterService, useValue: mockVoterService }
        ],
        schemas: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });
});
