import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTrackingComponent } from '@src/app/dashboard/component-tracking/component-tracking.component';

describe('ComponentTrackingComponent', () => {
  let component: ComponentTrackingComponent;
  let fixture: ComponentFixture<ComponentTrackingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentTrackingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
