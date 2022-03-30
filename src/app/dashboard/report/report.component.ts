import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReportService } from 'src/app/service/report.service';
import { MachineService } from 'src/app/service/machine.service';
import { ReportDialogComponent } from '@src/app/dashboard/report-dialog/report-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  displayedColumns: string[] = ['name', 'status', 'des', 'event_time', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;
  status: any;
  machine: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private reportService: ReportService, private machineService: MachineService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMachines();
    this.getStatus();
    this.getReport();
  }

  view_edit(element) {
    console.log(element);
    this.addNewReport(element);

  }

  getReport() {
    // this.spinner.show();
    this.reportService.getReport().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
          console.log(this.errorMsg);
        } else if (res.message === 'NO_REPORT_FOUND') {
          this.spinner.hide();
          console.log('no report found');
          this.dataSource = '';
        } else if (res.message === 'GET_REPORT_DETAILS') {
            this.errorMsg = '';
            console.log('------getReportDetails------');
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
    const rid = element.rid;
    this.reportService.deleteReport(rid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'REPORT_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Report Deleted Successfully !!');
            console.log(response.data);
            this.getReport();
           }
        }
      }
    );
  }

  addNewReport(element ?) {
    const dialogRef = this.dialog.open(ReportDialogComponent, {
      width: '94vh',
      height: '55vh',
      data: {
        status: this.status,
        machine: this.machine,
        element
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getReport();
    });
  }

  getStatus() {
    // this.spinner.show();
    this.machineService.getMachineStatus().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_STATUS_FOUND') {
          console.log('no status found');
          this.status = res.data;
          // this.spinner.hide();
        } else if (res.message === 'GET_MACHINE_STATUS') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getMachineStatus------');
              console.log(res.data);
              this.status = res.data;
              // this.spinner.hide();
            }
        }
      }
    );
  }

  getMachines() {
    this.spinner.show();
    this.machineService.getMachines().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_MACHINE_FOUND') {
          console.log('no machine found');
          // this.spinner.hide();
          this.machine = res.data;
        } else if (res.message === 'GET_MACHINE_DETAILS') {
          this.errorMsg = '';
          if (res.data != null) {
            console.log('------getMachines------');
            console.log(res.data);
            this.machine = res.data;
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
