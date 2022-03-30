import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MachineconfigDialogComponent } from '@src/app/dashboard/machineconfig-dialog/machineconfig-dialog.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MachineService } from 'src/app/service/machine.service';

export interface Config {
    id: any;
    mcid: any;
    orgid: any;
    job_name: any;
    ref_standards: any;
    target_weld_deposit: any;
    temp_hs_thresold: any;
    temp_amb_thresold: any;
    temp_thresold_old: any;
    high_weld_volt_threshold: any;
    low_weld_volt_threshold: any;
    high_weld_cur_threshold: any;
    low_weld_cur_threshold: any;
    high_weld_gas_threshold: any;
    low_weld_gas_threshold: any;
    high_motor_volt_threshold: any;
    low_motor_volt_threshold: any;
    high_motor_cur_threshold: any;
    low_motor_cur_threshold: any;
    target_weld_cost: any;
    event_threshold_dur: any;
    part_threshold: any;
    target_arc_time: any;
    wm_id: any;
    jd_id: any;
    ws_id: any;
    sg_id: any;
    fm_id: any;
    wire_speed_high_threshold: any;
    wire_speed_low_threshold: any;
    current_polarity: any;
    travel_speed_max: any;
    travel_speed_min: any;
    weld_heat_input_max: any;
    weld_heat_input_min: any;
    deleted: any;
    created_by: any;
    approved_by: any;
    created_at: any;
    updated_at: any;
    set_weld_volt_threshold: any;
    set_weld_cur_threshold: any;
    set_weld_gas_threshold: any;
    set_motor_volt_threshold: any;
    set_motor_cur_threshold: any;
}

@Component({
  selector: 'app-machineconfigurations',
  templateUrl: './machineconfigurations.component.html',
  styleUrls: ['./machineconfigurations.component.scss']
})
export class MachineconfigurationsComponent implements OnInit {

  displayedColumns: string[] = ['job_name', 'ref_standards','target_arc_time',  'target_weld_deposit', 'target_weld_cost', 'action'];
  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  errorMsg: string;

  constructor(private dialog: MatDialog, private router: Router, private changeDetectorRef: ChangeDetectorRef,
              private toaster: ToastrService, private spinner: NgxSpinnerService, private machineService: MachineService) { }

  ngOnInit() {
    this.getMachineConfig();
  }

  getMachineConfig() {
    this.spinner.show();
    this.machineService.getMachineConfig().subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'CONFIG_LIST') {
            this.errorMsg = '';
            this.dataSource = new MatTableDataSource<any>(response.data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.spinner.hide();
            console.log(response.data);
            console.log(this.dataSource);

           }
        }
      }
    );

  }

  view_edit(element) {
    element.event_threshold_dur= element.event_threshold_dur/60;
    element.part_threshold= element.part_threshold/60;
    element.target_arc_time= element.target_arc_time/3600;
    console.log(element);
    this.router.navigate(['/dashboard/home/mconfig'], { state: element });

  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const mcid = element.mcid;
    this.machineService.deleteMachineConfig(mcid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'CONFIG_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Configuration Deleted Successfully !!');
            console.log(response.data);
            this.getMachineConfig();
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
