import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLoadsComponent } from './driver-loads.component';

describe('DriverLoadsComponent', () => {
  let component: DriverLoadsComponent;
  let fixture: ComponentFixture<DriverLoadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverLoadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverLoadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
