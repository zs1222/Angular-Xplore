export interface WorkshopParticipantDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isHost: boolean;
    sessionId?: string;
}
