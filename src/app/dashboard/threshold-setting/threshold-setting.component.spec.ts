import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThresholdSettingComponent } from './threshold-setting.component';

describe('ThresholdSettingComponent', () => {
  let component: ThresholdSettingComponent;
  let fixture: ComponentFixture<ThresholdSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThresholdSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThresholdSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
