import { TestBed, inject } from '@angular/core/testing';

import { SaleDetailsService } from './sale-details.service';

describe('SaleDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SaleDetailsService]
    });
  });

  it('should be created', inject([SaleDetailsService], (service: SaleDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
