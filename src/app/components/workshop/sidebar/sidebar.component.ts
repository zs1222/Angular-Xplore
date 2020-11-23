import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidebarTabs } from '../../../constants/sidebartabs.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  tabToggle: number;

  public get sidebarTabs(): typeof SidebarTabs {
    return SidebarTabs;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.tabToggle = SidebarTabs.CHAT;
  }

  showChat(): void {
    this.tabToggle = SidebarTabs.CHAT;
  }

  showParticipantList(): void {
    this.tabToggle = SidebarTabs.PARTICIPANTLIST;
  }
}
