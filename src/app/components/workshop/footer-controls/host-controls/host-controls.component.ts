import { Component, OnInit, Host } from '@angular/core';
import { LoginService } from '../../../../services/login/login.service';
import { HostControls } from '../../../../constants/host-controls.constants';

@Component({
  selector: 'app-host-controls',
  templateUrl: './host-controls.component.html',
  styleUrls: ['./host-controls.component.scss']
})
export class HostControlsComponent implements OnInit {

  workshopState: HostControls;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.workshopState = HostControls.TD;
  }

  public get hostControls(): typeof HostControls {
    return HostControls;
  }

  show3D(): void {
    this.workshopState = HostControls.TD;
  }

  showWS(): void {
    this.workshopState = HostControls.WS;
  }

  showSS(): void {
    this.workshopState = HostControls.SS;
  }
}
