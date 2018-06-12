import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesticideDataComponent } from './pesticide-data.component';

describe('PesticideDataComponent', () => {
  let component: PesticideDataComponent;
  let fixture: ComponentFixture<PesticideDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesticideDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesticideDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
