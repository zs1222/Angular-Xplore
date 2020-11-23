import { WorkshopParticipant } from '../workshop-participant';

export interface LoginResponseDto {
  token: string;
  participant: WorkshopParticipant;
}
