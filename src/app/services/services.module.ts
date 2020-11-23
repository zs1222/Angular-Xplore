import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RealtimeService } from './http/realtime/realtime.service';
import { RestService } from './http/rest/rest.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login/login.service';
import { TwilioChatService } from './chat/twilio/twilio-chat.service';
import { TwilioVideoService } from './video/twilio/twilio-video.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    RealtimeService,
    RestService,
    LoginService,
    TwilioChatService,
    TwilioVideoService
  ]
})
export class ServicesModule { }
