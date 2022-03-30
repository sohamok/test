import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSpecificationComponent } from '@src/app/dashboard/component-specification/component-specification.component';

describe('ComponentSpecificationComponent', () => {
  let component: ComponentSpecificationComponent;
  let fixture: ComponentFixture<ComponentSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
