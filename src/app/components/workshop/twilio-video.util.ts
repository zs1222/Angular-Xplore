import { Injectable } from '@angular/core';
import { Track } from 'twilio-video';
import { TwilioTrackType } from '../../constants/twilio-video.constants';
import { LoginService } from '../../services/login/login.service';

@Injectable({
    providedIn: 'root'
  })

export class TwilioVideoHelper {
  constructor(private loginService: LoginService) {}

  attachTrack(track: any, participantId: string): Track {
    const loggedInUser = this.loginService.getParticipant();
    const attachedTrack = track.attach();
    if (track.kind === TwilioTrackType.VIDEO) {
      this.styleVideoTrack(attachedTrack, participantId === loggedInUser.id);
    }
    return attachedTrack;
  }

  private styleVideoTrack(track: any, shouldScale: boolean): void {
    if (shouldScale) {
      track.style.transform = 'scale(-1,1)';
    }
    track.style.height = '100%';
  }
}
