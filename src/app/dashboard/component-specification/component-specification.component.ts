import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MachineSetupComponent } from '@src/app/dashboard/machine-setup/machine-setup.component';
import { MachineService } from 'src/app/service/machine.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ComponentSpecificationDialogComponent } from '@src/app/dashboard/component-specification-dialog/component-specification-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component-specification',
  templateUrl: './component-specification.component.html',
  styleUrls: ['./component-specification.component.scss']
})
export class ComponentSpecificationComponent implements OnInit {

  displayedColumns: string[] = ['specs_name', 'weld_efficiency', 'power_efficiency', 'clean_gel_consumption', 'nozzle_life', 'contact_tip_life','orifice_life', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;
  hierarchy: any = [];
  config: any;
  component: any;
  status: any;
  type: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialog: MatDialog, private toaster: ToastrService, private machineService: MachineService, private spinner: NgxSpinnerService, private router: Router ) {

  }

  ngOnInit() {
    this.getComSpec();
  }

  getComSpec() {
    this.spinner.show();
    this.machineService.getComponent().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_COMPONENT_FOUND') {
            console.log('no config found');
            this.config = res.data;
            this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_COMPONENT_DETAILS') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------get Spec. Details------');
              console.log(res.data);
              this.config = res.data;
              this.dataSource = new MatTableDataSource<any>(res.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              this.spinner.hide();
            }
          }
        }
      }
    );
  }

  view_edit(element) {
    console.log(element);
    this.router.navigate(['/dashboard/home/mcomspec'], { state: element });

  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const mcsid = element.mcsid;
    this.machineService.deleteMachineComSpec(mcsid).subscribe(
      response => {
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'COMPONENT_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Component Deleted Successfully !!');
            console.log(response.data);
            this.getComSpec();
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
