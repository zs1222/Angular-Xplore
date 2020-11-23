import { TestBed, inject } from '@angular/core/testing';
import { VideoService } from './video.service';
import { RestService } from '../http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Video', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        VideoService,
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
  });

  it('should ...', inject([VideoService], (service: VideoService) => {
    expect(service).toBeTruthy();
  }));
});
