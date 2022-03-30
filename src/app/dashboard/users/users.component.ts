import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NewuserComponent } from '@src/app/dashboard/newuser/newuser.component';
import { UserService } from 'src/app/service/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GeolocationService } from 'src/app/service/geolocation.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['identification_no', 'name', 'email', 'rolename', 'certificate_id', 'phno', 'hierarchy', 'action']; // ,'action'
  dataSource;
  errorMsg: string;
  hierarchy: any = [];
  role: any;
  orgid = 1;
  location: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private userService: UserService, private toaster: ToastrService, private spinner: NgxSpinnerService, private geolocationService: GeolocationService ) { }

  ngOnInit() {
    this.getLocationSiteHierarchy();
    this.getHierarchy();
    this.getRole();
    this.getUser();
  }

  getHierarchy() {
    // var orgid = this.actRoute.snapshot.paramMap.get('orgid')
    this.spinner.show();
    this.geolocationService.getHierarchyGroup().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_HIERARCHY_FOUND') {
            console.log('no hierarchy found');
            this.hierarchy = res.data;
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_HIERARCHY_DETAILS') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getHierarchyDetails------');
              console.log(res.data);
              this.hierarchy = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getRole() {
    // this.spinner.show();
    this.userService.getRole().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_ROLE_FOUND') {
            console.log('no Role found');
            this.role = res.data;
            this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_ROLES') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getRoles------');
              console.log(res.data);
              this.role = res.data;
              this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getUser() {
    this.spinner.show();
    this.userService.getUser().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_USER_FOUND') {
            this.spinner.hide();
            console.log('no user found');
          }
        } else {
          if (res.message === 'GET_USER_DETAILS') {
            this.errorMsg = '';
            console.log('------getUserDetails------');
            // console.log(res.data);
            this.spinner.hide();
            if (res.data != null) {
              this.dataSource = new MatTableDataSource<any>(res.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              console.log(this.dataSource);
              console.log(this.dataSource.rolename);

            }
          }

        }
      });
  }

  addNewUser(element ?) {
    const dialogRef = this.dialog.open(NewuserComponent, {
      width: '85vh',
      height: '75vh',
      data: {
        hierarchy: this.hierarchy,
        role: this.role,
        element,
        location: this.location
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.event === 'Update' || result.event === 'Save' ) {
        this.getUser();
      }
    });
  }

  view_edit(element) {
    console.log(element);
    this.addNewUser(element);

  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const uid = element.uid;
    this.userService.deleteUser(uid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'USER_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'User Deleted Successfully !!');
            console.log(response.data);
            this.getUser();
           }
        }
      }
    );
  }

  getLocationSiteHierarchy() {
    this.spinner.show();
    this.geolocationService.getLocation().subscribe(
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
          if (res.message === 'GET_LOCATION_DETAILS') {
            this.errorMsg = '';
            console.log('------getLocationDetails------');
            console.log(res.data);
            this.location = res.data;
            this.spinner.hide();
          }
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
