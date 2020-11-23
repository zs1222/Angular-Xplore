import { Injectable } from '@angular/core';
import { RestService } from '../http/rest/rest.service';
import { Observable } from 'rxjs';
import { ChatTokenRequestDto } from '../../models/dtos/request/chat-token-request-dto';
import { VideoChatTokenDto } from '../../models/dtos/response/video-chat-token-dto';

@Injectable({
  providedIn: 'root'
})
export abstract class ChatService {

  baseEndpoint = 'chat';

  constructor(protected restService: RestService) { }

  abstract getToken(identity: ChatTokenRequestDto): Observable<VideoChatTokenDto>;

}
