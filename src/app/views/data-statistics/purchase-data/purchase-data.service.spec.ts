import { TestBed, inject } from '@angular/core/testing';

import { PurchaseDataService } from './purchase-data.service';

describe('PurchaseDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseDataService]
    });
  });

  it('should be created', inject([PurchaseDataService], (service: PurchaseDataService) => {
    expect(service).toBeTruthy();
  }));
});
