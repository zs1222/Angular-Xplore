import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    combineLatest([this.route.params, this.route.queryParams]).subscribe(
      (params) => {
        if (params[0].workshopId && params[1].participantId) {
          this.loginService
            .loginParticipant(params[0].workshopId, params[1].participantId)
            .subscribe(() => {
              this.router.navigate(['workshop']);
            });
        } else {
          // TODO: Navigate to failed login page
          throw new Error();
        }
      }
    );
  }
}
