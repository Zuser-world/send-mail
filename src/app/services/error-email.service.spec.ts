import { TestBed } from '@angular/core/testing';

import { ErrorEmailService } from './error-email.service';

describe('ErrorEmailService', () => {
  let service: ErrorEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
