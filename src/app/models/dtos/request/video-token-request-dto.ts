export class VideoTokenRequestDto {
  identity: string;
  room: string;

  constructor(identity: string, room: string) {
    this.identity = identity;
    this.room = room;
  }
}
