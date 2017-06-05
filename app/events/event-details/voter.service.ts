import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Sessions } from '../shared/index';

@Injectable()
export class VoterService {
  constructor(private http: Http) {}

  deleteVoter(eventId: number, session: Sessions, voterName: string): void {
    session.voters = session.voters.filter(voter => voter !== voterName);
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

    this.http.delete(url).catch(this.handleError).subscribe();
  }

  addVoter(eventId: number, session: Sessions, voterName: string): void {
    session.voters.push(voterName);
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const url = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`;

    this.http.post(url, {}, options).catch(this.handleError).subscribe();
  }

  userHasVoted(session: Sessions, voterName: string): boolean {
    return session.voters.some(voter => voter === voterName);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }
}
