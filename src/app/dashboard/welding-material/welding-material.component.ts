import { Component, OnInit, ViewChild } from '@angular/core';
import { WeldingMaterialService } from 'src/app/service/welding-material.service';
// import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';




import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WeldingMaterialDialogComponent } from '@src/app/dashboard/welding-material-dialog/welding-material-dialog.component';


@Component({
  selector: 'app-welding-material',
  templateUrl: './welding-material.component.html',
  styleUrls: ['./welding-material.component.scss']
})
export class WeldingMaterialComponent implements OnInit {

  displayedColumns: string[] = ['refName', 'name', 'grade', 'thickness', 'diameter', 'material_group', 'standard', 'delivery_condition', 'action'];

  errorMsg: string;
  // w_details: any=[];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // constructor(private WMaterialService: WeldingMaterialService, private toaster: ToastrService,private spinner: NgxSpinnerService) { }
  constructor(private dialog: MatDialog, private WMaterialService: WeldingMaterialService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }


  ngOnInit() {
      this.getWeldingMaterial();
  }

  getWeldingMaterial() {
    // var orgid = this.actRoute.snapshot.paramMap.get('orgid')
    // this.spinner.show();
    this.WMaterialService.getWeldingMaterial().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_WELDING_MATERIAL_DETAILS_FOUND') {
            console.log('No Welding material Details Found');
           // this.w_details = res.data;
            // this.spinner.hide();
          }
        } else {
            if (res.message === 'WELDING_MATERIAL_LIST') {
              this.errorMsg = '';
              if (res.data != null) {
                console.log('------getWeldingMaterialDetails------');
                console.log(res.data);
                // this.w_details = res.data;
                // this.spinner.hide();
                if (res.data != null) {
                    this.dataSource = new MatTableDataSource<any>(res.data);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort;
                  // console.log(this.dataSource);
                  // console.log(this.dataSource.rolename);
              // }
            }
          }
        }
      }
    }
    );
  }

  addNewMaterial(element ?) {
    const dialogRef = this.dialog.open(WeldingMaterialDialogComponent, {
      width: '85vh',
      height: '75vh',
      data: {

        element
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result.event === 'Update' || result.event === 'Save' ) {
        this.getWeldingMaterial();
      }
    });
  }

  view_edit(element) {
    console.log(element);
    this.addNewMaterial(element);

  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const wm_id = element.wm_id;
    this.WMaterialService.deleteWeldingMaterial(wm_id).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'WELDING_MATERIAL_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Welding Material Deleted Successfully !!');
            console.log(response.data);
            this.getWeldingMaterial();
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
