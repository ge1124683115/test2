import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSaleDataComponent } from './merchant-sale-data.component';

describe('MerchantSaleDataComponent', () => {
  let component: MerchantSaleDataComponent;
  let fixture: ComponentFixture<MerchantSaleDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantSaleDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantSaleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
