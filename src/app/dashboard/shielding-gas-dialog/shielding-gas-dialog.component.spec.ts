import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldingGasDialogComponent } from '@src/app/dashboard/shielding-gas-dialog/shielding-gas-dialog.component';

describe('ShieldingGasDialogComponent', () => {
  let component: ShieldingGasDialogComponent;
  let fixture: ComponentFixture<ShieldingGasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShieldingGasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShieldingGasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
