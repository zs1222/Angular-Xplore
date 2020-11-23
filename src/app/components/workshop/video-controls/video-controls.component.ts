import { Component, OnInit, Input } from '@angular/core';
import { TwilioVideoService } from '../../../services/video/twilio/twilio-video.service';
import { WorkshopParticipantDto } from 'src/app/models/dtos/response/workshop-participant-dto';
import { TwilioTrackWrapper } from 'src/app/models/twilio-track-wrapper';
import { TwilioTrackAction } from 'src/app/constants/twilio-video.constants';

@Component({
  selector: 'app-video-controls',
  templateUrl: './video-controls.component.html',
  styleUrls: ['./video-controls.component.scss']
})
export class VideoControlsComponent implements OnInit {

  audioIcon: string;
  readonly UNMUTE = 'unmute audio';
  readonly MUTE = 'mute audio';

  videoIcon: string;
  readonly SHOWVIDEO = 'show video';
  readonly HIDEVIDEO = 'hide video';

  @Input() workshopParticipant: WorkshopParticipantDto;
  @Input() localParticipant: any;

  constructor(private videoService: TwilioVideoService) {
    this.audioIcon = this.MUTE;
    this.videoIcon = this.HIDEVIDEO;
  }

  ngOnInit(): void {}

  toggleLocalVideoTrack(): void {
    this.localParticipant.videoTracks.forEach((track) => {
      if (track.isTrackEnabled === true) {
        track.track.disable();
        this.videoIcon = this.SHOWVIDEO;
        this.emitTrackDisable(track);
      } else if (track.isTrackEnabled === false) {
        track.track.enable();
        this.videoIcon = this.HIDEVIDEO;
        this.emitTrackEnable(track);
      }
    });
  }

  toggleLocalAudioTrack(): void {
    this.localParticipant.audioTracks.forEach((track) => {
      if (track.isTrackEnabled === true) {
        track.track.disable();
        this.audioIcon = this.UNMUTE;
        this.emitTrackDisable(track);
      } else if (track.isTrackEnabled === false) {
        track.track.enable();
        this.audioIcon = this.MUTE;
        this.emitTrackEnable(track);
      }
    });
  }

  private emitTrackDisable(track): void {
    const wrapper = new TwilioTrackWrapper();
    wrapper.track = track;
    wrapper.participant = this.workshopParticipant;
    wrapper.action = TwilioTrackAction.DISABLE;
    this.videoService.emitTrack(wrapper);
  }

  private emitTrackEnable(track): void {
    const wrapper = new TwilioTrackWrapper();
    wrapper.track = track;
    wrapper.participant = this.workshopParticipant;
    wrapper.action = TwilioTrackAction.ENABLE;
    this.videoService.emitTrack(wrapper);
  }

}
