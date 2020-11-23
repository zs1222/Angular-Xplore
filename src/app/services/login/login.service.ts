import { Injectable } from '@angular/core';
import { RestService } from '../http/rest/rest.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WorkshopParticipant } from '../../models/workshop-participant';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginRoute = 'login';
  private participant: WorkshopParticipant = null;

  constructor(private restService: RestService) {

  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  setAccessToken(accessToken: string): void {
    localStorage.setItem('token', accessToken);
  }

  getParticipant(): WorkshopParticipant {
    return JSON.parse(localStorage.getItem('participant')) as WorkshopParticipant;
  }

  setParticipant(participant: WorkshopParticipant): void {
    localStorage.setItem('participant', JSON.stringify(participant));
  }

  loginParticipant(sessionId: string, id: string): Observable<void> {
    return this.restService.login(this.loginRoute, { sessionId, id }).pipe(
      map((response) => {
        this.setAccessToken(response.token);
        this.setParticipant(response.participant);
        return;
      })
    );
  }
}
