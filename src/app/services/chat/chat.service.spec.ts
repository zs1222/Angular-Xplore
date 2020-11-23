import { TestBed, inject } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { RestService } from '../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Chat', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([ChatService], (service: ChatService) => {
    expect(service).toBeTruthy();
  }));
});
