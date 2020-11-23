import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { WorkshopParticipant } from 'src/app/models/workshop-participant';

@Component({
  selector: 'app-footer-controls',
  templateUrl: './footer-controls.component.html',
  styleUrls: ['./footer-controls.component.scss']
})
export class FooterControlsComponent implements OnInit {

  loggedInUser: WorkshopParticipant;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loggedInUser = this.loginService.getParticipant();
  }
}
