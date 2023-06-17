import { TestBed } from '@angular/core/testing';

import { AddemployeeserviceService } from './addemployeeservice.service';

describe('AddemployeeserviceService', () => {
  let service: AddemployeeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddemployeeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
