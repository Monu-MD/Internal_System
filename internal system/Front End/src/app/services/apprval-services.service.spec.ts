import { TestBed } from '@angular/core/testing';

import { ApprvalServicesService } from './apprval-services.service';

describe('ApprvalServicesService', () => {
  let service: ApprvalServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprvalServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
