import { TestBed } from '@angular/core/testing';

import { JourneysService } from './journeys.service';

describe('JourneysService', () => {
  let service: JourneysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JourneysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
