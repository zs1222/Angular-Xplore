import { Injectable } from '@angular/core';
import { RestService } from '../http/rest/rest.service';
import { Observable } from 'rxjs';
import { WorkshopParticipantDto } from '../../models/dtos/response/workshop-participant-dto';

@Injectable({
  providedIn: 'root',
})
export class SessionService {

  constructor(private restService: RestService) { }

  getParticipants(sessionId: string): Observable<WorkshopParticipantDto[]> {
    return this.restService.get<WorkshopParticipantDto[]>(`session/${sessionId}/participants`);
  }
}
