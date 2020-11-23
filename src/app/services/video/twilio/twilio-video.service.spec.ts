/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { TwilioVideoService } from './twilio-video.service';
import { RestService } from '../../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: TwilioVideo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TwilioVideoService,
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([TwilioVideoService], (service: TwilioVideoService) => {
    expect(service).toBeTruthy();
  }));
});
