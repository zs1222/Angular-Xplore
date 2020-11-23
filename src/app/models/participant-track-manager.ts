import { TwilioTrackType } from '../constants/twilio-video.constants';
import { WorkshopParticipantDto } from './dtos/response/workshop-participant-dto';

export class ParticipantTrackManager {
  participant: WorkshopParticipantDto;
  videoTrack: any;
  audioTrack: any;

  constructor(participant: WorkshopParticipantDto) {
    this.participant = participant;
  }

  addTrack(track: any, type: string): void {
    switch (type) {
      case TwilioTrackType.VIDEO:
        this.videoTrack = track;
        break;
      case TwilioTrackType.AUDIO:
        this.audioTrack = track;
    }
  }

  removeTrack(type: string): void {
    switch (type) {
      case TwilioTrackType.VIDEO:
        this.videoTrack = null;
        break;
      case TwilioTrackType.AUDIO:
        this.audioTrack = null;
    }
  }

  enableTrack(type: string): void {
    switch (type) {
      case TwilioTrackType.VIDEO:
        this.videoTrack.hidden = false;
        break;
      case TwilioTrackType.AUDIO:
        if (this.audioTrack) {
          this.audioTrack.muted = false;
        }
        break;
    }
  }

  disableTrack(type: string): void {
    switch (type) {
      case TwilioTrackType.VIDEO:
        this.videoTrack.hidden = true;
        break;
      case TwilioTrackType.AUDIO:
        if (this.audioTrack) {
          this.audioTrack.muted = true;
        }
        break;
    }
  }

  hasNoTracks(): boolean {
    return !this.videoTrack && !this.audioTrack;
  }
}
