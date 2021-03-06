import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserComponent } from '@src/app/dashboard/newuser/newuser.component';

describe('NewuserComponent', () => {
  let component: NewuserComponent;
  let fixture: ComponentFixture<NewuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
