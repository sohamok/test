import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { FillerMaterialService } from 'src/app/service/filler-material.service';
import { FillerMaterialDialogComponent } from '@src/app/dashboard/filler-material-dialog/filler-material-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filler-material',
  templateUrl: './filler-material.component.html',
  styleUrls: ['./filler-material.component.scss']
})
export class FillerMaterialComponent implements OnInit {
  displayedColumns: string[] = ['refName', 'trade_name', 'fm_group', 'classification', 'wire_dia', 'wire_density', 'wire_weight_per_length', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private fillerMaterialService: FillerMaterialService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getFillerMaterial();
  }

  view_edit(element) {
    console.log(element);
    this.addNewFillerMaterial(element);

  }

  getFillerMaterial() {
    this.spinner.show();
    this.fillerMaterialService.getFillerMaterial().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_FILLER_MATERIAL_LIST_FOUND') {
          this.spinner.hide();
          console.log('no filler material found');
        } else if (res.message === 'FILLER_MATERIAL_LIST') {
            this.errorMsg = '';
            console.log('------getFillerMaterialDetails------');
            // console.log(res.data);
            this.spinner.hide();
            if (res.data != null) {
            this.dataSource = new MatTableDataSource<any>(res.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.dataSource);
            }
        }
      }
    );
  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const fmid = element.fm_id;
    this.fillerMaterialService.deleteFillerMaterial(fmid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'FILLER_MATERIAL_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Filler material Deleted Successfully !!');
            console.log(response.data);
            this.getFillerMaterial();
           }
        }
      }
    );
  }

  addNewFillerMaterial(element ?) {
    const dialogRef = this.dialog.open(FillerMaterialDialogComponent, {
      width: '94vh',
      height: '55vh',
      data: {
        element
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getFillerMaterial();
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
