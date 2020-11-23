import { Injectable } from '@angular/core';
import { RestService } from '../http/rest/rest.service';
import { Observable } from 'rxjs';
import { VideoTokenRequestDto } from '../../models/dtos/request/video-token-request-dto';
import { VideoChatTokenDto } from '../../models/dtos/response/video-chat-token-dto';

@Injectable({
  providedIn: 'root'
})
export abstract class VideoService {

  baseEndpoint = 'video';

  constructor(protected restService: RestService) { }

  abstract getToken(identity: VideoTokenRequestDto): Observable<VideoChatTokenDto>;

}
