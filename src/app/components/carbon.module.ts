import { NgModule } from '@angular/core';
import {
  VideoOffModule,
  VideoFilledModule,
  MicrophoneFilledModule,
  MicrophoneOffModule,
  UserModule,
  ChatModule } from '@carbon/icons-angular';

@NgModule({
  imports: [
    VideoOffModule,
    VideoFilledModule,
    MicrophoneFilledModule,
    MicrophoneOffModule,
    UserModule,
    ChatModule
  ],
  declarations: []
})
export class CarbonModule { }
