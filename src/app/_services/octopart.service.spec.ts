import { TestBed } from '@angular/core/testing';

import { OctopartService } from './octopart.service';

describe('OctopartService', () => {
  let service: OctopartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OctopartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
