import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationDialogComponent } from '@src/app/dashboard/location-dialog/location-dialog.component';


describe('LocationDiglogComponent', () => {
  let component: LocationDialogComponent;
  let fixture: ComponentFixture<LocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
