import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JointDesignComponent } from '@src/app/dashboard/joint-design/joint-design.component';

describe('JointDesignComponent', () => {
  let component: JointDesignComponent;
  let fixture: ComponentFixture<JointDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JointDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JointDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
