import { TestBed } from '@angular/core/testing';

import { SendEmailApiService } from './send-email-api.service';

describe('SendEmailApiService', () => {
  let service: SendEmailApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEmailApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
