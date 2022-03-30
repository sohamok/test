import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentSpecificationDialogComponent } from '@src/app/dashboard/component-specification-dialog/component-specification-dialog.component';

describe('ComponentSpecificationDialogComponent', () => {
  let component: ComponentSpecificationDialogComponent;
  let fixture: ComponentFixture<ComponentSpecificationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentSpecificationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentSpecificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
