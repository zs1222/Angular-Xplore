import { Injectable } from '@angular/core';
import { ChatService } from '../chat.service';
import { RestService } from '../../http/rest/rest.service';
import { Observable } from 'rxjs';
import { ChatTokenRequestDto } from '../../../models/dtos/request/chat-token-request-dto';
import { VideoChatTokenDto } from '../../../models/dtos/response/video-chat-token-dto';

@Injectable({
  providedIn: 'root'
})
export class TwilioChatService extends ChatService {

  constructor(restService: RestService) {
    super(restService);
  }

  getToken(identity: ChatTokenRequestDto): Observable<VideoChatTokenDto> {
    return this.restService.post<ChatTokenRequestDto, VideoChatTokenDto>(`${this.baseEndpoint}/token`, identity);
  }

}
