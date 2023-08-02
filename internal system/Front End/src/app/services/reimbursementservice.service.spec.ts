import { TestBed } from '@angular/core/testing';

import { ReimbursementserviceService } from './reimbursementservice.service';

describe('ReimbursementserviceService', () => {
  let service: ReimbursementserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReimbursementserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
