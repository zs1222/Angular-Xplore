import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WorkshopComponent } from './workshop/workshop.component';
import { FooterControlsComponent } from './workshop/footer-controls/footer-controls.component';
import { HostVideoComponent } from './workshop/host-video/host-video.component';
import { SidebarComponent } from './workshop/sidebar/sidebar.component';
import { WebGlComponent } from './workshop/web-gl/web-gl.component';
import { LoginComponent } from './login/login.component';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { VideoFrameComponent } from './workshop/video-frame/video-frame.component';
import { VideoContainerComponent } from './workshop/footer-controls/video-container/video-container.component';
import { ContentComponent } from './workshop/content/content.component';
import { VideoControlsComponent } from './workshop/video-controls/video-controls.component';
import { ChatComponent } from './workshop/sidebar/chat/chat.component';
import { HostControlsComponent } from './workshop/footer-controls/host-controls/host-controls.component';
import { CarbonModule } from './carbon.module';

@NgModule({
  imports: [
    CarbonModule,
    ChatModule,
    CommonModule,
    RouterModule
  ],
  declarations: [
    ChatComponent,
    ContentComponent,
    FooterControlsComponent,
    HostControlsComponent,
    HostVideoComponent,
    LoginComponent,
    SidebarComponent,
    VideoContainerComponent,
    VideoControlsComponent,
    VideoFrameComponent,
    WebGlComponent,
    WorkshopComponent
  ]
})
export class ComponentsModule { }
