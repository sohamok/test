import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShieldingGasComponent } from '@src/app/dashboard/shielding-gas/shielding-gas.component';

describe('ShieldingGasComponent', () => {
  let component: ShieldingGasComponent;
  let fixture: ComponentFixture<ShieldingGasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShieldingGasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShieldingGasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
