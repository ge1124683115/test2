import { TestBed, inject } from '@angular/core/testing';

import { MerchantSaleDataService } from './merchant-sale-data.service';

describe('MerchantSaleDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantSaleDataService]
    });
  });

  it('should be created', inject([MerchantSaleDataService], (service: MerchantSaleDataService) => {
    expect(service).toBeTruthy();
  }));
});
