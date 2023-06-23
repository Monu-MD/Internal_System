import { TestBed } from '@angular/core/testing';

import { EmpdetaislService } from './empdetaisl.service';

describe('EmpdetaislService', () => {
  let service: EmpdetaislService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpdetaislService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
