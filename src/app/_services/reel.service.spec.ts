/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReelService } from './reel.service';

describe('Service: Reel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReelService]
    });
  });

  it('should ...', inject([ReelService], (service: ReelService) => {
    expect(service).toBeTruthy();
  }));
});
