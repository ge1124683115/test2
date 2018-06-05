import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkboardContentComponent } from './workboard-content.component';

describe('WorkboardContentComponent', () => {
  let component: WorkboardContentComponent;
  let fixture: ComponentFixture<WorkboardContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkboardContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkboardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
