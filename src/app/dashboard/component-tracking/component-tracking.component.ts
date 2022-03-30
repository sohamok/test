import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { MachineService } from 'src/app/service/machine.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-component-tracking',
  templateUrl: './component-tracking.component.html',
  styleUrls: ['./component-tracking.component.scss']
})
export class ComponentTrackingComponent implements OnInit {
  errorMsg: any;
  componentTrackingArray: any;
  contacttip: any =  [];
  nozzle: any = [];
  orifice: any = [];
  // cleaninggel: any = [];
  wireRemaning: any = [];
  gasRemaning: any = [];
  edit: any = [];


  constructor(private machineService: MachineService, private toaster: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getComponentTracking();
  }

  getComponentTracking() {
    this.spinner.show();
    this.machineService.getComponentTracking().subscribe(
      res => {
        console.log(res);
        if (!res.status || res.status === 401) {
          this.errorMsg = 'Unauthorized';
          console.log(this.errorMsg);
          if (res.message === 'NO_COMPONENT_TRACKING_FOUND') {
            console.log('no component tracking found');
            this.spinner.hide();
          }
        } else {
          if (res.message === 'GET_COMPONENT_TRACKING') {
            this.errorMsg = '';
            console.log('------getComponentTracking------');
            this.spinner.hide();
            if (res.data != null) {
              console.log(res);
              this.componentTrackingArray = res.data;
            }
          }
        }
      }
    );
  }

  toggleContactTip(event, index) {
    console.log(event);
    console.log(index);
    this.contacttip[index] = event.checked;
    console.log(this.contacttip);

  }

  toggleNozzle(event, index) {
    console.log(event);
    console.log(index);
    this.nozzle[index] = event.checked;
  }

  toggleOrifice(event, index) {
    console.log(event);
    console.log(index);
    this.orifice[index] = event.checked;
  }

  save(data, index) {
    // if (confirm("Press a button!")) {
    //   txt = "You pressed OK!";
    // } else {
    //   txt = "You pressed Cancel!";
    // }
    this.spinner.show();
    const componentTracking = {
      data,
      contacttip: this.contacttip[index],
      nozzle : this.nozzle[index],
      orifice: this.orifice[index],
      // cleaninggel: this.cleaninggel[index],
      wireRemaning: this.wireRemaning[index],
      gasRemaning: this.gasRemaning[index]
    };
    console.log(componentTracking);
    this.machineService.createComponentTracking(componentTracking).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          // console.log(response.data);
          this.spinner.hide();
        } else {
          if (response.message === 'COMPONENT_REFILLED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.toaster.success('Success', 'Component Refilled Successfully !!');
            // console.log(response.data);
            // console.log(this.componentTrackingArray[index]);
            Object.assign(this.componentTrackingArray[index], response.data);
            // console.log(this.componentTrackingArray[index]);

            // this.componentTrackingArray[index]= response.data;
            // this.cleaninggel[index] = '';
            this.wireRemaning[index] = '';
            this.gasRemaning[index] = '';
            this.edit[index] = false;
            // this.getComponentTracking();
            this.spinner.hide();
            }
          }
        }
      );
    }

    cancel(index) {
      this.edit[index] = false;
    }

    onEdit(index) {
      this.edit[index] = true;
    }
}
