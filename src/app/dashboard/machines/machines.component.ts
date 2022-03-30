import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MachineSetupComponent } from '@src/app/dashboard/machine-setup/machine-setup.component';
import { MachineService } from 'src/app/service/machine.service';
import { HardwareService } from 'src/app/service/hardware.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GeolocationService } from 'src/app/service/geolocation.service';


@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit  {

  displayedColumns: string[] = ['hardware_id', 'name', 'des', 'status', 'mtype', 'hierarchy', 'config', 'spec', 'action'];
  dataSource;
  orgid = 1;
  errorMsg: string;
  hardware: any;
  allHardware: any;
  hierarchy: any = [];
  config: any;
  component: any;
  status: any;
  type: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  location: any;

  constructor(private dialog: MatDialog, private toaster: ToastrService, private hardwareService: HardwareService, private machineService: MachineService, private spinner: NgxSpinnerService, private geolocationService: GeolocationService  ) {

  }

  ngOnInit() {
    this.getLocationSiteHierarchy();
    this.getHierarchy();
    this.getStatus();
    this.getType();
    this.getHardware();
    this.getAllHardware();
    this.getConfig();
    this.getComponent();
    this.getMachines();
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

  getHardware() {
    // this.spinner.show();
    this.hardwareService.getAvailableHardware().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_HARDWARE_FOUND') {
            console.log('no hardware found');
            this.hardware = res.data;
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_HARDWARE_DETAILS') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getHardwares------');
              console.log(res.data);
              this.hardware = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getAllHardware() {
    // this.spinner.show();
    this.hardwareService.getHardwareByOrg().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_HARDWARE_FOUND') {
            console.log('no hardware found');
            this.allHardware = res.data;
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_HARDWARE_BY_ORG') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getHardwaresAll------');
              console.log(res.data);
              this.allHardware = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getStatus() {
    // this.spinner.show();
    this.machineService.getMachineStatus().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_STATUS_FOUND') {
            console.log('no status found');
            this.status = res.data;
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_MACHINE_STATUS') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getMachineStatus------');
              console.log(res.data);
              this.status = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getType() {
    // this.spinner.show();
    this.machineService.getMachiineType().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_TYPE_FOUND') {
            console.log('no type found');
            this.type = res.data;
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_MACHINE_TYPE') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getMachineType------');
              console.log(res.data);
              this.type = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getConfig() {
    // var orgid = this.actRoute.snapshot.paramMap.get('orgid')
    this.spinner.show();
    this.machineService.getMachineConfig().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
        } else {
          if (res.message === 'NO_CONFIG_FOUND') {
            console.log('no config found');
            this.config = res.data;
            // this.spinner.hide();
          } else if (res.message === 'CONFIG_LIST') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getConfigDetails------');
              console.log(res.data);
              this.config = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  getComponent() {
    // var orgid = this.actRoute.snapshot.paramMap.get('orgid')
    this.spinner.show();
    this.machineService.getComponent().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_COMPONENT_FOUND') {
            console.log('no component found');
            this.component = res.data;
            // this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_COMPONENT_DETAILS') {
            this.errorMsg = '';
            if (res.data != null) {
              console.log('------getComponentDetails------');
              console.log(res.data);
              this.component = res.data;
              // this.spinner.hide();
            }
          }
        }
      }
    );
  }

  addNewMachine(element ?) {
    const dialogRef = this.dialog.open(MachineSetupComponent, {
      width: '94vh',
      height: '80vh',
      data: {
        hierarchy: this.hierarchy,
        type: this.type,
        status: this.status,
        config: this.config,
        component: this.component,
        hardware: this.hardware,
        allHardware: this.allHardware,
        element,
        location: this.location
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
      this.getHardware();
      this.getMachines();
    });
  }

  getMachines() {
    this.machineService.getMachines().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_MACHINE_FOUND') {
            console.log('no machine found');
            this.dataSource = '';
            console.log(this.dataSource);
            this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_MACHINE_DETAILS') {
            this.errorMsg = '';
            console.log('------getMachineDetails------');
            this.spinner.hide();
            if (res.data != null) {
              this.dataSource = new MatTableDataSource<any>(res.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
              console.log(this.dataSource);
              console.log(this.dataSource.status);
              console.log(this.dataSource.mtype);
              
            }
          }
        }
      });
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

  view_edit(element) {
    console.log(element);
    this.addNewMachine(element);

  }

  delete(element) {
    console.log(element);
    this.spinner.show();
    const mid = element.mid;
    this.machineService.deleteMachine(mid).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'MACHINE_DELETED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Machine Deleted Successfully !!');
            console.log(response.data);
            this.getMachines();
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
