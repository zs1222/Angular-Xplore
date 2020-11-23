import { Injectable } from '@angular/core';
import { PhotonClient } from './photon.client';
import { PhotonContentMessageDto } from 'src/app/models/dtos/response/photon-content-message.dto';
import { Subject } from 'rxjs';
import PHOTON_CONSTANTS from 'src/app/constants/photon.constants';

@Injectable({
  providedIn: 'root'
})
export class PhotonService {

  client: PhotonClient;
  openModalOverlay = new Subject<PhotonContentMessageDto>();
  openFullscreenOverlay = new Subject<PhotonContentMessageDto>();

  constructor() { }

  connectToPhotonRoom(sessionId: string): void {
    this.client = new PhotonClient(sessionId);

    this.client.openModalOverlay.subscribe((message: PhotonContentMessageDto) => {
      this.openModalOverlay.next(message);
    });

    this.client.openFullscreenOverlay.subscribe((message: PhotonContentMessageDto) => {
      this.openFullscreenOverlay.next(message);
    });

    this.client.connectToRegionMaster(PHOTON_CONSTANTS.REGION);
  }
}
