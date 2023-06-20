import { TestBed } from '@angular/core/testing';

import { MarkMOdulesService } from './mark-modules.service';

describe('MarkMOdulesService', () => {
  let service: MarkMOdulesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkMOdulesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
