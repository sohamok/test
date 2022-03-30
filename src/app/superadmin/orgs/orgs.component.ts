import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { OrganizationService } from 'src/app/service/organization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrgDialogComponent } from '@src/app/superadmin/org-dialog/org-dialog.component';

@Component({
  selector: 'app-orgs',
  templateUrl: './orgs.component.html',
  styleUrls: ['./orgs.component.scss']
})
export class OrgsComponent implements OnInit {

  //displayedColumns: string[] = ['name', 'org_email', 'created_at','swadmin_name','swadmin_email','action'];
  displayedColumns: string[] = ['name', 'org_email', 'org_code', 'swadmin_name','swadmin_email', 'created_at','action'];

  dataSource;
  errorMsg: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private organizationService: OrganizationService, private spinner: NgxSpinnerService,private dialog: MatDialog,private toaster: ToastrService,) { }

  ngOnInit(): void {
    this.getOrganization();
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
            this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_ORGS_DETAILS') {
            this.errorMsg = '';
            console.log('------getOrgDetails------');
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
  

  addNewOrg(element ?) {
    const dialogRef = this.dialog.open(OrgDialogComponent, {
      width: '94vh',
      height: '55vh',
      data: {
        element,
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getOrganization();
    });
  }


  view_edit(element) {
    console.log(element);
    this.addNewOrg(element);
  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const orgid = element.orgid;
    this.organizationService.deleteOrganization(orgid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'ORG_USER_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Organization Deleted Successfully !!');
            console.log(response.data);
            this.getOrganization();
           }
        }
      }
    );
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
