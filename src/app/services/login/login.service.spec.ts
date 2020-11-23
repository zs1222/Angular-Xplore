import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import { RestService } from '../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
