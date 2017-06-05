import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from './../../user/auth.service';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { SessionListComponent } from './session-list.component';
import { Sessions } from './../shared/event.model';
import { VoterService } from './voter.service';
import { DurationPipe } from '../shared/duration.pipe';

describe('SessionListComponent Shallow', () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(
    async(() => {
      let mockAuthService = {
        isAuthenticated: () => true,
        currentUser: {
          userName: 'Joe'
        }
      };
      let mockVoterService = {
        userHasVoted: () => true
      };

      TestBed.configureTestingModule({
        imports: [],
        declarations: [
          SessionListComponent,
          //   UpvoteComponent,
          DurationPipe
          //   CollapsibleWellComponent
        ],
        providers: [
          { provide: AuthService, useValue: mockAuthService },
          { provide: VoterService, useValue: mockVoterService }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('Initial Display', () => {
    it('should have the correct session title', () => {
      component.sessions = [
        {
          id: 3,
          name: 'Session 1',
          presenter: 'Joe',
          duration: 1,
          level: 'beginner',
          abstract: 'abstract',
          voters: ['john', 'bob']
        }
      ];

      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();
      fixture.detectChanges();

      expect(element.querySelector('[well-title]').textContent).toContain('Session 1');
      expect(debugEl.query(By.css('[well-title')).nativeElement.textContent).toContain('Session 1');
    });
  });
});
