import { Http } from '@angular/http';
import { AuthService } from './../../user/auth.service';
import { Sessions } from './../shared/event.model';
import { SessionListComponent } from './session-list.component';
import { VoterService } from './voter.service';

describe('SessionListComponent', () => {
  let component: SessionListComponent;
  const mockAuthService = new AuthService({} as Http);
  const mockVoterService = new VoterService({} as Http);

  beforeEach(() => {
    component = new SessionListComponent(mockAuthService, mockVoterService);
  });

  describe('ngOnChanges', () => {
    it('should filter the sessions correctly', () => {
      component.sessions = [
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'beginner' }
      ] as Sessions[];
      component.filterBy = 'intermediate';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();
      expect(component.visibleSessions.length).toBe(2);
    });

    it('should filter the sessions correctly', () => {
      component.sessions = [
        { name: 'session 1', level: 'intermediate' },
        { name: 'session 2', level: 'intermediate' },
        { name: 'session 3', level: 'beginner' }
      ] as Sessions[];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 3;

      component.ngOnChanges();
      expect(component.visibleSessions[2].name).toBe('session 3');
    });
  });
});
