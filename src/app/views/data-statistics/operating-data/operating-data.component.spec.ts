import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatingDataComponent } from './operating-data.component';

describe('OperatingDataComponent', () => {
  let component: OperatingDataComponent;
  let fixture: ComponentFixture<OperatingDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatingDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
