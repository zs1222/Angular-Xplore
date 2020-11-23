import PHOTON_CONSTANTS from '../../constants/photon.constants';
import { PhotonContentMessageDto } from 'src/app/models/dtos/response/photon-content-message.dto';
import { Subject } from 'rxjs';
// tslint:disable-next-line: no-reference
/// <reference path="../../../photon/Photon-Javascript_SDK.d.ts"/>



export class PhotonClient extends Photon.LoadBalancing.LoadBalancingClient {

    openModalOverlay = new Subject<PhotonContentMessageDto>();
    openFullscreenOverlay = new Subject<PhotonContentMessageDto>();
    sessionId: string;

    constructor(sessionId: string) {
        super(
            PHOTON_CONSTANTS.CONNECTION_PROTOCOL,
            PHOTON_CONSTANTS.APP_ID,
            PHOTON_CONSTANTS.APP_VERSION);

        this.sessionId = sessionId;
        this.setLogLevel(PHOTON_CONSTANTS.LOG_LEVEL);
        this.autoJoinLobby = true;
    }

    onStateChange(state: number): void {
        switch (state) {
            case Photon.LoadBalancing.LoadBalancingClient.State.ConnectedToNameServer:
                console.log(`Conencted to game server`);
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.ConnectedToMaster:
                console.log(`Connected to master`);
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.JoinedLobby:
                console.log(`Joined lobby`);
                this.joinRoom(this.sessionId);
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.ConnectingToGameserver:
                console.log('Connecting to game server');
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.ConnectedToGameserver:
                console.log('Connected to game server');
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.Joined:
                console.log('Joined room');
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.Error:
                console.log('Error!');
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.Uninitialized:
                console.log('Uninitialized!');
                break;
            case Photon.LoadBalancing.LoadBalancingClient.State.Disconnected:
                console.log('Disconnected!');
                break;
            default:
                break;
        }
    }

    onEvent(code: number, content: any, _actorNr: number): void {
        switch (code) {
            case PHOTON_CONSTANTS.MODAL_MESSAGE_CODE:
                this.openModalOverlay.next(content as PhotonContentMessageDto);
                break;
            case PHOTON_CONSTANTS.FULLSCREEN_MESSAGE_CODE:
                this.openFullscreenOverlay.next(content as PhotonContentMessageDto);
        }
    }

}
