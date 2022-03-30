import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ShieldingGasService } from 'src/app/service/shielding-gas.service';
import { ShieldingGasDialogComponent } from '@src/app/dashboard/shielding-gas-dialog/shielding-gas-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shielding-gas',
  templateUrl: './shielding-gas.component.html',
  styleUrls: ['./shielding-gas.component.scss']
})
export class ShieldingGasComponent implements OnInit {
  displayedColumns: string[] = ['refName', 'shielding_gas_name', 'shielding_gas_group', 'purging_gas_name', 'purging_gas_group', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private shieldingGasService: ShieldingGasService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getShieldingGas();
  }

  view_edit(element) {
    console.log(element);
    this.addNewShieldingGas(element);

  }

  getShieldingGas() {
    this.spinner.show();
    this.shieldingGasService.getShieldingGas().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else if (res.message === 'NO_SHIELDING_GAS_LIST_FOUND') {
          this.spinner.hide();
          console.log('no shielding gas found');
        } else if (res.message === 'SHIELDING_GAS_LIST') {
            this.errorMsg = '';
            console.log('------getShieldingGasDetails------');
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
    const sgid = element.sg_id;
    this.shieldingGasService.deleteShieldingGas(sgid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'SHIELDING_GAS_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Shielding Gas Deleted Successfully !!');
            console.log(response.data);
            this.getShieldingGas();
           }
        }
      }
    );
  }

  addNewShieldingGas(element ?) {
    const dialogRef = this.dialog.open(ShieldingGasDialogComponent, {
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
      this.getShieldingGas();
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
