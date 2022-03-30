import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HardwareService } from 'src/app/service/hardware.service';
import { OrganizationService } from 'src/app/service/organization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HardwareDialogComponent } from '@src/app/superadmin/hardware-dialog/hardware-dialog.component';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-hardwares',
  templateUrl: './hardwares.component.html',
  styleUrls: ['./hardwares.component.scss']
})
export class HardwaresComponent implements OnInit {

  displayedColumns: string[] = ['hardware_id', 'hardware_name', 'org_name', 'w_expire_date', 'status', 'action'];
  dataSource;
  errorMsg: string;
  organization: any;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private hardwareService: HardwareService,private organizationService: OrganizationService, private spinner: NgxSpinnerService,private toaster: ToastrService,) { }

  ngOnInit(): void {
    this.getOrganization();
    this.getHardware();
  }

  view_edit(element) {
    console.log(element);
    this.addNewHardware(element);
  }

  getHardware() {
    // this.spinner.show();
    this.hardwareService.getHardware().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_HARDWARE_FOUND') {
            console.log('no hardware found');
            this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_HARDWARE_DETAILS') {
            this.errorMsg = '';
            console.log('------getHardwareDetails------');
            this.spinner.hide();
            if (res.data != null) {
              this.dataSource = new MatTableDataSource<any>(res.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              console.log(this.dataSource);
            }
          }
        }
      });
  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const hwid = element.hwid;
    this.hardwareService.deleteHardware(hwid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'HARDWARE_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Hardware Deleted Successfully !!');
            console.log(response.data);
            this.getHardware();
           }
        }
      }
    );
  }

  addNewHardware(element ?) {
    const dialogRef = this.dialog.open(HardwareDialogComponent, {
      width: '94vh',
      height: '55vh',
      data: {
        element,
        organization: this.organization
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getHardware();
    });
  }

  getOrganization() {
    this.spinner.show();
    this.organizationService.getOrganization().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_ORGANIZATION_FOUND') {
            console.log('no org found');
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_ORGS_DETAILS') {
            this.errorMsg = '';
            console.log('------getOrgDetails------');
            // this.spinner.hide();
            if (res.data != null) {
              console.log(res.data);
              this.organization = res.data;
            }
          }
        }
      }
    )
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
