/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BOMService } from './BOM.service';

describe('Service: BOM', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BOMService = TestBed.get(BOMService);
    expect(service).toBeTruthy();
  });
});
