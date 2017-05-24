import { Injectable } from '@angular/core';
import { Sessions } from '../shared/index';

@Injectable()
export class VoterService {

    constructor() { }

    deleteVoter(session: Sessions, voterName: string): void {
        session.voters = session.voters.filter(voter => voter !== voterName);
    }

    addVoter(session: Sessions, voterName: string): void {
        session.voters.push(voterName);
    }

    userHasVoted(session: Sessions, voterName: string): boolean {
        return session.voters.some(voter => voter === voterName);
    }
}