import { Sessions } from './../shared/event.model';
import { VoterService } from './voter.service';
import { Observable } from 'rxjs/Rx';

describe('VoterService', () => {
  let voterService: VoterService;
  let mockHttp: any;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
    voterService = new VoterService(mockHttp);
  });

  describe('deleteVoter', () => {
    it('should remove the voter from the list of voters', () => {
      const session = { id: 6, voters: ['joe', 'john'] };
      mockHttp.delete.and.returnValue(Observable.of(false));

      voterService.deleteVoter(3, <Sessions>session, 'joe');
      expect(session.voters.length).toBe(1);
      expect(session.voters[0]).toBe('john');
    });
  });
});
