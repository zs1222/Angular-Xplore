import { TestBed } from '@angular/core/testing';
import { SessionService } from './session.service';
import { RestService } from '../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
