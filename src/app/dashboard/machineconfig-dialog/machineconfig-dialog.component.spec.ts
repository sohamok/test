import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineconfigDialogComponent } from '@src/app/dashboard/machineconfig-dialog/machineconfig-dialog.component';

describe('MachineconfigDialogComponent', () => {
  let component: MachineconfigDialogComponent;
  let fixture: ComponentFixture<MachineconfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineconfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineconfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
