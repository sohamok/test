import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareDialogComponent } from './hardware-dialog.component';

describe('HardwareDialogComponent', () => {
  let component: HardwareDialogComponent;
  let fixture: ComponentFixture<HardwareDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardwareDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
