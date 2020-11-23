/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { RestService } from './rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: Rest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should ...', inject([RestService], (service: RestService) => {
    expect(service).toBeTruthy();
  }));
});
