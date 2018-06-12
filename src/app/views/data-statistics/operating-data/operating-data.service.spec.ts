import { TestBed, inject } from '@angular/core/testing';

import { OperatingDataService } from './operating-data.service';

describe('OperatingDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperatingDataService]
    });
  });

  it('should be created', inject([OperatingDataService], (service: OperatingDataService) => {
    expect(service).toBeTruthy();
  }));
});
