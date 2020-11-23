import { Component, OnInit } from '@angular/core';
import { ParticipantTrackManager } from '../../../models/participant-track-manager';
import { TwilioVideoService } from '../../../services/video/twilio/twilio-video.service';
import { TwilioTrackAction, TwilioTrackType } from '../../../constants/twilio-video.constants';
import { TwilioTrackWrapper } from '../../../models/twilio-track-wrapper';
import { TwilioVideoHelper } from '../twilio-video.util';

@Component({
  selector: 'app-host-video',
  templateUrl: './host-video.component.html',
  styleUrls: ['./host-video.component.scss']
})
export class HostVideoComponent implements OnInit {

  participantTrackManager: ParticipantTrackManager;

  constructor(private videoService: TwilioVideoService, private videoHelper: TwilioVideoHelper) {}

  ngOnInit(): void {
    this.videoService.getHostTrackEmitter().subscribe((trackWrapper: TwilioTrackWrapper) => {

      if (this.participantTrackManager == null) {
        this.participantTrackManager = new ParticipantTrackManager(trackWrapper.participant);
      }

      switch (trackWrapper.action) {
        case TwilioTrackAction.ATTACH:
          const attachedTrack = this.videoHelper.attachTrack(trackWrapper.track, this.participantTrackManager.participant.id);
          this.participantTrackManager.addTrack(attachedTrack, trackWrapper.track.kind);
          break;
        case TwilioTrackAction.DETACH:
          trackWrapper.track.detach();
          this.participantTrackManager.removeTrack(trackWrapper.track.kind);
          if (this.participantTrackManager.hasNoTracks()) {
            this.participantTrackManager = null;
          }
          break;
        case TwilioTrackAction.DISABLE:
          this.participantTrackManager.disableTrack(trackWrapper.track.kind);
          break;
        case TwilioTrackAction.ENABLE:
          this.participantTrackManager.enableTrack(trackWrapper.track.kind);
          break;
      }
    });
  }
}
