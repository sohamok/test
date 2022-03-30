import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeldingSequenceDialogComponent } from '@src/app/dashboard/welding-sequence-dialog/welding-sequence-dialog.component';

describe('WeldingSequenceDialogComponent', () => {
  let component: WeldingSequenceDialogComponent;
  let fixture: ComponentFixture<WeldingSequenceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeldingSequenceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeldingSequenceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
