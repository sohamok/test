import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeldingSequenceComponent } from '@src/app/dashboard/welding-sequence/welding-sequence.component';

describe('WeldingSequenceComponent', () => {
  let component: WeldingSequenceComponent;
  let fixture: ComponentFixture<WeldingSequenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeldingSequenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeldingSequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
