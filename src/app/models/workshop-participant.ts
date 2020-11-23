import { WorkshopParticipantDto } from './dtos/response/workshop-participant-dto';

export class WorkshopParticipant implements WorkshopParticipantDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isHost: boolean;
  sessionId: string;
}
