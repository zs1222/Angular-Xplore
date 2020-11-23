/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TwilioChatService } from './twilio-chat.service';
import { RestService } from '../../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: TwilioChat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TwilioChatService,
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([TwilioChatService], (service: TwilioChatService) => {
    expect(service).toBeTruthy();
  }));
});
