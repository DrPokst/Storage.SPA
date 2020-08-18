/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OdataService } from './odata.service';

describe('Service: Odata', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OdataService]
    });
  });

  it('should ...', inject([OdataService], (service: OdataService) => {
    expect(service).toBeTruthy();
  }));
});
