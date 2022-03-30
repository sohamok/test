import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShiftService } from 'src/app/service/shift.service';
import { ShiftDialogComponent } from '@src/app/dashboard/shift-dialog/shift-dialog.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss']
})
export class ShiftComponent implements OnInit {
  displayedColumns: string[] = ['name', 'start_tm', 'end_tm', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private shiftService: ShiftService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getShift();
  }

  view_edit(element) {
    console.log(element);
    this.addNewShift(element);

  }

  getShift() {
    this.spinner.show();
    this.shiftService.getShift().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_SHIFT_FOUND') {
          this.spinner.hide();
          console.log('no shift found!');
        } else if (res.message === 'GET_SHIFT_DETAILS') {
            this.errorMsg = '';
            console.log('------getShiftDetails------');
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
    const shid = element.shid;
    this.shiftService.deleteShift(shid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'SHIFT_AND_MAPPING_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Shift Deleted Successfully !!');
            console.log(response.data);
            this.getShift();
           }
        }
      }
    );
  }

  addNewShift(element ?) {
    const dialogRef = this.dialog.open(ShiftDialogComponent, {
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
      this.getShift();
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


