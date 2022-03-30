import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FillerMaterialComponent } from '@src/app/dashboard/filler-material/filler-material.component';

describe('FillerMaterialComponent', () => {
  let component: FillerMaterialComponent;
  let fixture: ComponentFixture<FillerMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FillerMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FillerMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
