import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { connect, Room, RemoteParticipant } from 'twilio-video';
import { WorkshopParticipant } from '../../models/workshop-participant';
import { LoginService } from '../../services/login/login.service';
import { SessionService } from '../../services/session/session.service';
import { TwilioVideoService } from '../../services/video/twilio/twilio-video.service';
import { PhotonService } from '../../services/photon/photon.service';
import { WorkshopParticipantDto } from '../../models/dtos/response/workshop-participant-dto';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss']
})
export class WorkshopComponent implements OnInit, OnDestroy {

  router: Router;
  route: ActivatedRoute;
  videoRoom: Room;
  workshopParticipant: WorkshopParticipant;
  allWorkshopParticipants: WorkshopParticipantDto[];


  constructor(route: ActivatedRoute, router: Router, private videoService: TwilioVideoService,
              private loginService: LoginService, private sessionService: SessionService,
              private photonService: PhotonService) {
    this.router = router;
    this.route = route;
  }

  ngOnInit(): void {
    this.getParticipantInfo();
    this.photonService.connectToPhotonRoom(this.workshopParticipant.sessionId);

    const videoToken$ = this.videoService.initializeLocalVideoSession(this.workshopParticipant);
    const participants$ = this.sessionService.getParticipants(this.workshopParticipant.sessionId);

    combineLatest([videoToken$, participants$]).subscribe(([videoToken, participants]) => {
      if (videoToken && participants) {
        this.allWorkshopParticipants = participants;
        this.connectVideoRoom(videoToken.token);
      } else {
        throw new Error();
      }
    });

    // TODO - ensure user is routed to correct state based on host state
    this.router.navigate(['3D'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.disconnectFromRoom();
  }

  @HostListener('window:beforeunload', ['$event'])
  public beforeunloadHandler(): void {
    this.disconnectFromRoom();
  }

  getParticipantInfo(): void {
    this.workshopParticipant = this.loginService.getParticipant();
  }

  connectVideoRoom(videoToken: string): void {
    connect(videoToken, {
      name: this.workshopParticipant.sessionId,
      dominantSpeaker: true
    }).then((room: Room) => {
      this.videoRoom = room;
      this.initializeTracks();
    });
  }

  private initializeTracks(): void {
    this.videoRoom.participants.forEach(participant => {
      console.log(participant);
      this.videoService.initializeParticipant(participant, this.getParticipantById(participant.identity));
      console.log(`Participant "${participant.identity}" is connected to the Room`);
    });

    this.videoRoom.on('participantConnected', (participant: RemoteParticipant) => {
      this.videoService.initializeParticipant(participant, this.getParticipantById(participant.identity));
    });

    this.videoRoom.on('dominantSpeakerChanged', (participant: RemoteParticipant) => {
      console.log('The new dominant speaker in the Room is:', participant);
      this.videoService.dominantSpeakerChanged.emit(participant);
    });

    this.videoService.initializeLocalTracks(this.getParticipantById(this.workshopParticipant.id));
  }

  private getParticipantById(participantId: string): WorkshopParticipantDto {
    return this.allWorkshopParticipants.find(p => p.id === participantId);
  }

  private disconnectFromRoom(): void {
    if (!!this.videoRoom) {
      this.videoRoom.disconnect();
    }
  }
}
