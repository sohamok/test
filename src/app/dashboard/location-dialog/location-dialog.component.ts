import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit, ViewChild } from '@angular/core';
import { GeolocationService } from 'src/app/service/geolocation.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatExpansionPanel } from '@angular/material/expansion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.scss']
})
export class LocationDialogComponent implements OnInit {
  errorMsg: string;
  panelOpenState = false;
  checked = false;
  location: any = [];
  selectedLocation: any;
  selectedHierarchyId: any;

  locName: any;
  siteName: any;
  hireName: any;


  constructor(public dialogRef: MatDialogRef<LocationDialogComponent>, @Inject(MAT_DIALOG_DATA) public parentData: any, private cdr: ChangeDetectorRef, private toaster: ToastrService) {
      this.location = parentData.location;
      this.selectedHierarchyId = parentData.selectedHierarchyId;
      console.log(parentData);
      if (this.selectedHierarchyId) {
        this.location.forEach((loc, i) => {
          loc.Sites.forEach((site, j) => {
            site.Hierarchy_Groups.forEach((hire, k) => {
              if (hire.hid ===  this.selectedHierarchyId && this.selectedHierarchyId ) {
                this.locName  = loc.name;
                this.siteName = site.name;
                this.hireName = hire.name;
              }
            });
          });

        });
      }
  }

  ngOnInit() {
    this.cdr.detectChanges();
  }

  test() {
    console.log(this.selectedLocation);
  }

  onClick() {
    this.dialogRef.close({event: 'close', location: this.selectedLocation});
  }

  save() {
    if (!this.selectedLocation) {
      this.toaster.warning('Please Select One Location!!');
    } else {
      this.onClick();
    }
  }

}
