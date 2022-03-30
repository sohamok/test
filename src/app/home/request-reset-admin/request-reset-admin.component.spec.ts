import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetAdminComponent } from './request-reset-admin.component';

describe('RequestResetAdminComponent', () => {
  let component: RequestResetAdminComponent;
  let fixture: ComponentFixture<RequestResetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestResetAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
