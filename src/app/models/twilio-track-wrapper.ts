import { TwilioTrackAction } from '../constants/twilio-video.constants';
import { WorkshopParticipantDto } from './dtos/response/workshop-participant-dto';

export class TwilioTrackWrapper {
  action: TwilioTrackAction;
  participant: WorkshopParticipantDto;
  track: any;
}
