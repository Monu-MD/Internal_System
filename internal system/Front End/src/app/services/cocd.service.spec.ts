import { TestBed } from '@angular/core/testing';

import { CocdService } from './cocd.service';

describe('CocdService', () => {
  let service: CocdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
