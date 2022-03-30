import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeldingMaterialComponent } from '@src/app/dashboard/welding-material/welding-material.component';

describe('WeldingMaterialComponent', () => {
  let component: WeldingMaterialComponent;
  let fixture: ComponentFixture<WeldingMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeldingMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeldingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
