import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointDesignDialogComponent } from '@src/app/dashboard/joint-design-dialog/joint-design-dialog.component';

describe('JointDesignDialogComponent', () => {
  let component: JointDesignDialogComponent;
  let fixture: ComponentFixture<JointDesignDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointDesignDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointDesignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
