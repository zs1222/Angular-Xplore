import { TwilioVideoService } from 'src/app/services/video/twilio/twilio-video.service';
import { RemoteParticipant } from 'twilio-video';
import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { WorkshopParticipantDto } from '../../../models/dtos/response/workshop-participant-dto';

@Component({
  selector: 'app-video-frame',
  templateUrl: './video-frame.component.html',
  styleUrls: ['./video-frame.component.scss']
})
export class VideoFrameComponent implements OnInit, AfterViewInit {
  private _videoTrack: any;
  private _audioTrack: any;
  private _cachedAudioTrack: any;
  private _cachedVideoTrack: any;
  label: string;
  isDominant: boolean;

  @Input() participant: WorkshopParticipantDto;

  @Input()
  get twilioVideoTrack(): any { return this._videoTrack; }
  set twilioVideoTrack(track: any) {
    this._videoTrack = track;

    if (!!this.videoTrack) {
      this.attachVideoTrack(track);
    } else {
      this._cachedVideoTrack = track;
    }
  }

  @Input()
  get twilioAudioTrack(): any { return this._audioTrack; }
  set twilioAudioTrack(track: any) {
    this._audioTrack = track;

    if (!!this.audioTrack) {
      this.attachAudioTrack(track);
    } else {
      this._cachedAudioTrack = track;
    }
  }

  @ViewChild('videoTrack')
  videoTrack: ElementRef;

  @ViewChild('audioTrack')
  audioTrack: ElementRef;

  constructor(private videoService: TwilioVideoService) {
  }

  ngOnInit(): void {
    this.label = this.buildParticipantName(this.participant);
  }

  ngAfterViewInit(): void {
    if (this._cachedAudioTrack) {
      this.attachAudioTrack(this._cachedAudioTrack);
    }
    if (this._cachedVideoTrack) {
      this.attachVideoTrack(this._cachedVideoTrack);
    }

    this.videoService.dominantSpeakerChanged.subscribe((participant: RemoteParticipant) => {
      this.isDominant = participant.identity === this.participant.id;
    });
  }

  private attachVideoTrack(track: any): void {
    this.videoTrack.nativeElement.appendChild(track);
  }

  private attachAudioTrack(track: any): void {
    this.audioTrack.nativeElement.appendChild(track);
  }

  private buildParticipantName(participant: WorkshopParticipantDto): string {
    return `${participant.firstName} ${participant.lastName}`;
  }
}
