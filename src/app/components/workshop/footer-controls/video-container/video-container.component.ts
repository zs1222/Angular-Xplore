import { Component, OnInit } from '@angular/core';
import { TwilioVideoService } from '../../../../services/video/twilio/twilio-video.service';
import { TwilioTrackWrapper } from '../../../../models/twilio-track-wrapper';
import { ParticipantTrackManager } from '../../../../models/participant-track-manager';
import { TwilioTrackAction, TwilioTrackType } from '../../../../constants/twilio-video.constants';
import { TwilioVideoHelper } from '../../twilio-video.util';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss']
})
export class VideoContainerComponent implements OnInit {

  participantTrackManagers: ParticipantTrackManager[] = [];

  constructor(private videoService: TwilioVideoService, private videoHelper: TwilioVideoHelper) {}

  ngOnInit(): void {
    this.videoService.getCustomerTrackEmitter().subscribe((trackWrapper: TwilioTrackWrapper) => {
      const existingManager = this.getManagerByParticipantId(trackWrapper.participant.id);
      switch (trackWrapper.action) {
        case TwilioTrackAction.ATTACH:
          if (!!existingManager) {
            this.addTrack(existingManager, trackWrapper.track);
          } else {
            this.createNewManager(trackWrapper);
          }
          break;
        case TwilioTrackAction.DETACH:
          if (!!existingManager) {
            this.removeTrack(existingManager, trackWrapper.track);
          } else {
            console.log(`no track manager for participant ${trackWrapper.participant.id}`);
          }
          break;
        case TwilioTrackAction.DISABLE:
          existingManager.disableTrack(trackWrapper.track.kind);
          break;
        case TwilioTrackAction.ENABLE:
          existingManager.enableTrack(trackWrapper.track.kind);
          break;
      }
    });
  }

  createNewManager(trackWrapper: TwilioTrackWrapper): void {
    const newManager = new ParticipantTrackManager(trackWrapper.participant);
    this.addTrack(newManager, trackWrapper.track);
    this.participantTrackManagers.push(newManager);
  }

  addTrack(manager: ParticipantTrackManager, track: any): void {
    const attachedTrack = this.videoHelper.attachTrack(track, manager.participant.id);
    manager.addTrack(attachedTrack, track.kind);
  }

  removeTrack(manager: ParticipantTrackManager, track: any): void {
    track.detach();
    manager.removeTrack(track.kind);
    if (manager.hasNoTracks()) {
      const index = this.participantTrackManagers.findIndex((internalManager) => internalManager.participant.id === manager.participant.id);
      this.participantTrackManagers.splice(index, 1);
    }
  }

  getManagerByParticipantId(id: string): ParticipantTrackManager {
    return this.participantTrackManagers.find((manager) => manager.participant.id === id);
  }
}
