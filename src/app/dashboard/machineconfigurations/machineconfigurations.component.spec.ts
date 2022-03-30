import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineconfigurationsComponent } from '@src/app/dashboard/machineconfigurations/machineconfigurations.component';

describe('MachineconfigurationsComponent', () => {
  let component: MachineconfigurationsComponent;
  let fixture: ComponentFixture<MachineconfigurationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineconfigurationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
