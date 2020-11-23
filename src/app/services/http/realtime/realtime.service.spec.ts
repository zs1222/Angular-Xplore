/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RealtimeService } from './realtime.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Realtime', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RealtimeService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([RealtimeService], (service: RealtimeService) => {
    expect(service).toBeTruthy();
  }));
});
