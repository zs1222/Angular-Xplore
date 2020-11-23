import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { createLocalVideoTrack, RemoteAudioTrack, RemoteTrack, RemoteTrackPublication, RemoteVideoTrack, RemoteParticipant } from 'twilio-video';
import { VideoService } from '../video.service';
import { RestService } from '../../http/rest/rest.service';
import { VideoTokenRequestDto } from '../../../models/dtos/request/video-token-request-dto';
import { VideoChatTokenDto } from '../../../models/dtos/response/video-chat-token-dto';
import { WorkshopParticipantDto } from '../../../models/dtos/response/workshop-participant-dto';
import { WorkshopParticipant } from '../../../models/workshop-participant';
import { TwilioTrackWrapper } from '../../../models/twilio-track-wrapper';
import { TwilioTrackAction } from '../../../constants/twilio-video.constants';

@Injectable({
  providedIn: 'root'
})
export class TwilioVideoService extends VideoService {

  customerTrackEmitter: EventEmitter<TwilioTrackWrapper>;
  dominantSpeakerChanged: EventEmitter<RemoteParticipant> = new EventEmitter<RemoteParticipant>();
  hostTrackEmitter: EventEmitter<TwilioTrackWrapper>;

  constructor(restService: RestService) {
    super(restService);
  }

  getCustomerTrackEmitter(): EventEmitter<TwilioTrackWrapper> {
    if (!!this.customerTrackEmitter) {
      return this.customerTrackEmitter;
    } else {
      return this.instantiateCustomerTrackEmitter();
    }
  }

  getHostTrackEmitter(): EventEmitter<TwilioTrackWrapper> {
    if (!!this.hostTrackEmitter) {
      return this.hostTrackEmitter;
    } else {
      return this.instantiateHostTrackEmitter();
    }
  }

  getToken(identity: VideoTokenRequestDto): Observable<VideoChatTokenDto> {
    return this.restService.post<VideoTokenRequestDto, VideoChatTokenDto>(`${this.baseEndpoint}/token`, identity);
  }

  initializeLocalVideoSession(participant: WorkshopParticipant): Observable<VideoChatTokenDto> {
    this.getUserMedia();
    return this.createAndGetToken(participant);
  }

  initializeParticipant(twilioParticipant: any, participant: WorkshopParticipantDto): void {
    if (twilioParticipant) {
      twilioParticipant.tracks.forEach(publication => this.subscribe(participant, publication));
      twilioParticipant.on('trackPublished', publication => this.subscribe(participant, publication));
      twilioParticipant.on('trackUnpublished', publication => {
        if (publication && publication.track) {
          this.detachRemoteTrack(participant, publication.track);
        }
      });
    }
  }

  initializeLocalTracks(participant: WorkshopParticipantDto): void {
    createLocalVideoTrack().then(track => {
      this.emitAttachTrack(participant, track);
    });
  }

  private subscribe(participant: WorkshopParticipantDto, publication: RemoteTrackPublication | any): void {
    if (publication && publication.on) {
      publication.on('subscribed', (track: RemoteVideoTrack) => {
        this.attachRemoteTrack(participant, track);
        track.on('enabled', () => { this.enableRemoteTrack(participant, track); });
        track.on('disabled', () => { this.disableRemoteTrack(participant, track); });
      });
      publication.on('unsubscribed', (track: RemoteVideoTrack) => this.detachRemoteTrack(participant, track));
    }
  }

  private instantiateCustomerTrackEmitter(): EventEmitter<TwilioTrackWrapper> {
    this.customerTrackEmitter = new EventEmitter<TwilioTrackWrapper>();
    return this.customerTrackEmitter;
  }

  private instantiateHostTrackEmitter(): EventEmitter<TwilioTrackWrapper> {
    this.hostTrackEmitter = new EventEmitter<TwilioTrackWrapper>();
    return this.hostTrackEmitter;
  }

  private getUserMedia(): void {
    if (navigator.getUserMedia) {
      navigator.getUserMedia(
        { audio: true, video: true },
        (): void => {},
        (error: MediaStreamError): void => { console.log(`${error.name}: ${error.message}`); });
    }
    else if (navigator.vendor.match(/[Aa]+pple/g) && navigator.vendor.match(/[Aa]+pple/g).length > 0) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then((): void => {})
      .catch((error: MediaStreamError): void => { console.log(`${error.name}: ${error.message}`); });
    }
  }

  private createAndGetToken(participant: WorkshopParticipant): Observable<VideoChatTokenDto> {
    const videoTokenRequest = new VideoTokenRequestDto(participant.id, participant.sessionId);

    return this.getToken(videoTokenRequest);
  }

  private isAttachable(track: RemoteTrack): boolean {
    return !!track &&
        ((track as RemoteAudioTrack).attach !== undefined ||
        (track as RemoteVideoTrack).attach !== undefined);
  }

  private isDetachable(track: RemoteTrack): boolean {
    return !!track &&
      ((track as RemoteAudioTrack).detach !== undefined ||
        (track as RemoteVideoTrack).detach !== undefined);
  }

  private attachRemoteTrack(participant: WorkshopParticipantDto, track): void {
    if (this.isAttachable(track)) {
      this.emitAttachTrack(participant, track);
    }
  }

  private emitAttachTrack(participant: WorkshopParticipantDto, track): void {
    const wrapper = new TwilioTrackWrapper();
    wrapper.action = TwilioTrackAction.ATTACH;
    wrapper.participant = participant;
    wrapper.track = track;
    this.emitTrack(wrapper);
  }

  private detachRemoteTrack(participant: WorkshopParticipantDto, track): void {
    if (this.isDetachable(track)) {
      const wrapper = new TwilioTrackWrapper();
      wrapper.action = TwilioTrackAction.DETACH;
      wrapper.participant = participant;
      wrapper.track = track;
      this.emitTrack(wrapper);
    }
  }

  private disableRemoteTrack(participant: WorkshopParticipantDto, track): void {
    const wrapper = new TwilioTrackWrapper();
    wrapper.action = TwilioTrackAction.DISABLE;
    wrapper.participant = participant;
    wrapper.track = track;
    this.emitTrack(wrapper);
  }

  private enableRemoteTrack(participant: WorkshopParticipantDto, track): void {
    const wrapper = new TwilioTrackWrapper();
    wrapper.action = TwilioTrackAction.ENABLE;
    wrapper.participant = participant;
    wrapper.track = track;
    this.emitTrack(wrapper);
  }

  emitTrack(wrapper: TwilioTrackWrapper): void {
    if (wrapper.participant.isHost) {
      this.hostTrackEmitter.emit(wrapper);
    } else {
      this.customerTrackEmitter.emit(wrapper);
    }
  }
}
