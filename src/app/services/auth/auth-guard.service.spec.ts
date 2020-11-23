import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard.service';
import { RestService } from '../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthGuardService', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
