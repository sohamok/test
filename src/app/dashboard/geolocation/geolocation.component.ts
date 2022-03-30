import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormBuilder, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { GeolocationService } from 'src/app/service/geolocation.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute} from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationDialogComponent } from '@src/app/dashboard/confirmation-dialog/confirmation-dialog.component';
import timezones from 'timezones-list';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss']
})
export class GeolocationComponent implements OnInit {
  geoLocationForm: FormGroup;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  isSure = false;
  // orgid = 1;
  timezoneArray: [];

  constructor(private _fb: FormBuilder, private geoLocationService: GeolocationService, private dialog: MatDialog, private toaster: ToastrService, private actRoute: ActivatedRoute
      , private spinner: NgxSpinnerService) {

    this.geoLocationForm = this._fb.group({
      locationsArray: this._fb.array([])
    });

    this.matcher   = new MyErrorStateMatcher();

   }

  ngOnInit() {
    this.getLocationSiteHierarchy();
    console.log(timezones)
    this.timezoneArray = timezones;
    console.log(this.timezoneArray)
  }

  initLocRow(location ?) {
    return this._fb.group({
      Organization: this._fb.group({
        created_at:  [location ? location.Organization.created_at : ''],
        name      :  [location ? location.Organization.name : ''],
        org_email :  [location ? location.Organization.org_email : ''],
        orgid     :  [location ? location.Organization.orgid : ''],
        updated_at:  [location ? location.Organization.updated_at : ''],
      }),
      Sites: this._fb.array([]),
      created_at :  [location ? location.created_at : ''],
      locid      :  [location ? location.locid : ''],
      name       :  [location ? location.name : '', [Validators.required]],
      orgid      :  [location ? location.orgid : ''],
      lat        :  [location ? location.lat : ''],
      long       :  [location ? location.long : ''],
      timezone      :  [location ? location.timezone : ''],
      updated_at :  [location ? location.updated_at : ''],

    });
  }

  initSiteRow(site ?) {
    return this._fb.group({
      Hierarchy_Groups: this._fb.array([]),
      created_at :  [site ? site.created_at : ''],
      locid      :  [site ? site.locid : ''],
      orgid      :  [site ? site.orgid : ''],
      name       :  [site ? site.name : '', [Validators.required]],
      sid        :  [site ? site.sid : ''],
      updated_at :  [site ? site.updated_at : ''],

    });
  }

  initHierarchyGroupRow(hierarchy ?) {
    return this._fb.group({
      created_at :  [hierarchy ? hierarchy.created_at : ''],
      hid        :  [hierarchy ? hierarchy.hid : ''],
      name       :  [hierarchy ? hierarchy.name : '', [Validators.required]],
      sid        :  [hierarchy ? hierarchy.sid : ''],
      orgid      :  [hierarchy ? hierarchy.orgid : ''],
      updated_at :  [hierarchy ? hierarchy.updated_at : '']
    });
  }

  addNewLocation(location ?) {
    this.geoLocationForm.markAsUntouched();
    this.locationsArray().push(this.initLocRow(location));
    const index = this.geoLocationForm.controls.locationsArray.value.length - 1;
    console.log(index);

    if (location) {
      const sites: [] = location.Sites;
      sites.forEach(elment => {
        this.addNewSite(index, elment);
      });
    } else {
      this.addNewSite(index);
    }
  }

  addNewSite(locIndex: number , data?: any) {
    this.geoLocationForm.markAsUntouched();
    this.Sites(locIndex).push(this.initSiteRow(data));
    console.log(this.geoLocationForm);

    const index = this.geoLocationForm.controls.locationsArray.value[locIndex].Sites.length - 1;
    if (data) {
      const hierarchies: [] = data.Hierarchy_Groups;
      hierarchies.forEach(element => {
        this.addNewhierarchyGroup(locIndex, index, element);
      });
    } else {
      this.addNewhierarchyGroup(locIndex, index);
    }
  }

  addNewhierarchyGroup(locIndex: number, siteIndex: number, data?: any) {
    this.geoLocationForm.markAsUntouched();
    console.log(data);
    this.Hierarchy_Groups(locIndex, siteIndex).push(this.initHierarchyGroupRow(data));
  }

  locationsArray(): FormArray  {
    return this.geoLocationForm.get('locationsArray') as FormArray;
  }

  Sites(locIndex: number): FormArray {
    return this.locationsArray().at(locIndex).get('Sites') as FormArray;
  }

  Hierarchy_Groups(locIndex: number, siteIndex: number): FormArray {
    return this.Sites(locIndex).at(siteIndex).get('Hierarchy_Groups') as FormArray;
  }

  removeLocation(locIndex: number, location: any) {
    // console.log(this.geoLocationForm);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(confirmed);
        console.log(location);
        const locationValue = location.value;
        const locid = location.value.locid;
        this.spinner.show();

        if (locid) {
        this.geoLocationService.deleteLocationIndex(locationValue, locid).subscribe(
          res => {
            console.log(res);
            if (!res.status || res.status === 401) {
              this.errorMsg = 'Unauthorized';
              console.log(this.errorMsg);
              if (res.message === 'NO_LOCATION_FOUND') {
                console.log('xxxx');
                this.spinner.hide();
              }
            } else {
              if (res.message === 'LOCATION_DELETED_SUCCESSFULLY') {
                this.spinner.hide();
                this.errorMsg = '';
                console.log('------Location Delete------');
                this.locationsArray().removeAt(locIndex);
                this.toaster.success('Success', 'LOCATION DELETED SUCCESSFULLY !!');
              }
            }
          });
      } else {
        this.spinner.hide();
        this.locationsArray().removeAt(locIndex);
      }
      }
    });
  }

  removeSite(locIndex: number, siteIndex: number, site: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete??',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(site);
        const sid = site.value.sid;
        this.spinner.show();
        if (sid) {
        this.geoLocationService.deleteSiteIndex(sid).subscribe(
          res => {
            console.log(res);
            if (!res.status || res.status === 401) {
              this.errorMsg = 'Unauthorized';
              console.log(this.errorMsg);
              if (res.message === 'NO_SITE_FOUND') {
                console.log('xxxx');
                this.spinner.hide();
              }
            } else {
              if (res.message === 'SITE_DELETED_SUCCESSFULLY') {
                this.spinner.hide();
                this.errorMsg = '';
                console.log('------Site Delete------');
                this.Sites(locIndex).removeAt(siteIndex);
                this.toaster.success('Success', 'SITE DELETED SUCCESSFULLY !!');
              }
            }
          });
      } else {
        this.spinner.hide();
        this.Sites(locIndex).removeAt(siteIndex);
      }
      }
    });
  }

  removeHierarchyGroupIndex(locIndex: number, siteIndex: number, hierarchyGroupIndex: number, hierarchyGroup: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete??',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log(hierarchyGroup);
        const hid = hierarchyGroup.value.hid;
        this.spinner.show();
        if (hid) {
        this.geoLocationService.deleteHierarchyIndex(hid).subscribe(
          res => {
            console.log(res);
            if (!res.status || res.status === 401) {
              this.errorMsg = 'Unauthorized';
              console.log(this.errorMsg);
              if (res.message === 'NO_HIERARCHY_FOUND') {
                console.log('xxxx');
                this.spinner.hide();
              }
            } else {
              if (res.message === 'HIERARCHY_DETETED_SUCCESSFULLY') {
                this.spinner.hide();
                this.errorMsg = '';
                console.log('------hierarchy Delete------');
                this.Hierarchy_Groups(locIndex, siteIndex).removeAt(hierarchyGroupIndex);
                this.toaster.success('Success', ' HIERARCHY DELETED SUCCESSFULLY !!');
              }
            }
          });
      } else {
        this.spinner.hide();
        this.Hierarchy_Groups(locIndex, siteIndex).removeAt(hierarchyGroupIndex);
      }
      }
    });
  }

  getLocationSiteHierarchy() {
    this.spinner.show();
    // var orgid = this.actRoute.snapshot.paramMap.get('orgid')
    this.geoLocationService.getLocation().subscribe(
      res => {
        console.log(res);

        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_LOCATION_FOUND') {
            console.log('xxxx');
            this.spinner.hide();
            this.addNewLocation();
          }
        } else {
          if (res.message === 'GET_LOCATION_DETAILS') {
            this.errorMsg = '';
            console.log('------getLocationDetails------');
            console.log(res.data);
            this.spinner.hide();
            if (res.data != null) {
              this.loadDataInForm(res.data);
            }
          }

        }
      });
  }

  loadDataInForm(data) {
    data.forEach(element => {
      this.addNewLocation(element);
    });
  }

  get form() { return this.geoLocationForm.controls; }

  submit() {
    this.geoLocationForm.markAllAsTouched();
    console.log(this.geoLocationForm);
    // return;
    if (!this.geoLocationForm.invalid) {
      this.spinner.show();
      const locationValue = this.geoLocationForm.value;
      this.geoLocationService.location(locationValue).subscribe(
        response => {
          console.log(response);

          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'LOCATION_SITE_HIERARCHY_SAVED_SUCCESSFULLY') {
              this.errorMsg = '';
              this.toaster.success('Success', 'Location Updated Successfully !!');
              console.log(response.data);
              this.locationsArray().clear();
              const data: [] = response.data;
              this.loadDataInForm(data);
              this.spinner.hide();
             }
          }
        }
      );
    }
  }


  filterTimezone(event){
    console.log(event);
    // this.timezoneArray.filter(number => number > 5)
    

  }

}
