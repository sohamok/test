import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillerMaterialDialogComponent } from '@src/app/dashboard/filler-material-dialog/filler-material-dialog.component';

describe('FillerMaterialDialogComponent', () => {
  let component: FillerMaterialDialogComponent;
  let fixture: ComponentFixture<FillerMaterialDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillerMaterialDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillerMaterialDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
