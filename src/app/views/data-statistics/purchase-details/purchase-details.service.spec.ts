import { TestBed, inject } from '@angular/core/testing';

import { PurchaseDetailsService } from './purchase-details.service';

describe('PurchaseDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseDetailsService]
    });
  });

  it('should be created', inject([PurchaseDetailsService], (service: PurchaseDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
