import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeldingMaterialDialogComponent } from '@src/app/dashboard/welding-material-dialog/welding-material-dialog.component';

describe('WeldingMaterialDialogComponent', () => {
  let component: WeldingMaterialDialogComponent;
  let fixture: ComponentFixture<WeldingMaterialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeldingMaterialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeldingMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
