import { TestBed } from '@angular/core/testing';

import { FireStoreRestServiceService } from './fire-store-rest-service.service';

describe('FireStoreRestServiceService', () => {
  let service: FireStoreRestServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireStoreRestServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
