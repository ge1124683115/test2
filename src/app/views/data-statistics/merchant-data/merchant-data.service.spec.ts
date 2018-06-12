import { TestBed, inject } from '@angular/core/testing';

import { MerchantDataService } from './merchant-data.service';

describe('MerchantDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantDataService]
    });
  });

  it('should be created', inject([MerchantDataService], (service: MerchantDataService) => {
    expect(service).toBeTruthy();
  }));
});
