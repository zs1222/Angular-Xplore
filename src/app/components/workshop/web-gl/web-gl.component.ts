import { Component, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { WorkshopParticipant } from '../../../models/workshop-participant';
import { LoginService } from '../../../services/login/login.service';
import { PhotonService } from '../../../services/photon/photon.service';
import { PhotonContentMessageDto } from '../../../models/dtos/response/photon-content-message.dto';
import { ContentService } from '../../../services/content/content.service';

declare const UnityLoader: any;

@Component({
  selector: 'app-web-gl',
  templateUrl: './web-gl.component.html',
  styleUrls: ['./web-gl.component.scss']
})
export class WebGlComponent implements OnInit, OnDestroy {
  gameInstance: any;
  participant: WorkshopParticipant;
  unityLoadEmitter: EventEmitter<any>;
  modalContentId: string;
  fullscreenContentId: string;

  constructor(private loginService: LoginService, private photonService: PhotonService, private contentService: ContentService) { }

  ngOnInit(): void {
    this.unityLoadEmitter = new EventEmitter();
    this.participant = this.loginService.getParticipant();

    this.unityLoadEmitter.subscribe(() => {
      const serializedParticipant = JSON.stringify(this.participant);
      this.gameInstance.SendMessage('HostControlsView', 'StartConnection', serializedParticipant);
    });

    const localUnityEmitter = this.unityLoadEmitter;

    const callback = (() => {
      return (gameInstance: any, progress: any) => {
        if (!gameInstance.Module) {
          return;
        }

        if (progress === 1 && !gameInstance.removeTimeout) {
          localUnityEmitter.emit();
        }
      };
    })();

    this.gameInstance = UnityLoader.instantiate('gameContainer', '/web-gl/Build/WebGL_Test.json', { onProgress: callback });

    this.photonService.openModalOverlay.subscribe((content: PhotonContentMessageDto) => {
      this.modalContentId = content.OnClickUrl;
    });

    this.photonService.openFullscreenOverlay.subscribe((content: PhotonContentMessageDto) => {
      this.fullscreenContentId = content.OnClickUrl;
    });

    // video contenful id = 'Vwc10L90xhicERyVicDa6';
    // image contentful id = 4ZNNEL1eFml7fmFU4cBBhz
    // this.fullscreenContentId = 'Vwc10L90xhicERyVicDa6';
  }

  ngOnDestroy(): void {
    this.unityLoadEmitter.unsubscribe();
  }

}
