import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { MachineService } from 'src/app/service/machine.service';


declare var $: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-component-specification-dialog',
  templateUrl: './component-specification-dialog.component.html',
  styleUrls: ['./component-specification-dialog.component.scss']
})
export class ComponentSpecificationDialogComponent implements OnInit {

  @Input() childMessage: any;
  machineComponentSpecForm: FormGroup;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  isSure = false;
  // orgid = 1;
  mComSpecData: { [k: string]: any; };

  constructor( private fb: FormBuilder, private dialog: MatDialog, private router: Router,
               private toaster: ToastrService, private spinner: NgxSpinnerService, private machineService: MachineService) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.mComSpecData = this.router.getCurrentNavigation().extras.state;

    }

    this.machineComponentSpecForm = new FormGroup({
    id :  new FormControl(this.mComSpecData ? this.mComSpecData.id : null),
    mcsid :  new FormControl(this.mComSpecData ? this.mComSpecData.mcsid : null),
    orgid :  new FormControl(this.mComSpecData ? this.mComSpecData.orgid : null),
    specs_name:  new FormControl(this.mComSpecData ? this.mComSpecData.specs_name : null, [Validators.required]),
    roller_dia:  new FormControl(this.mComSpecData ? this.mComSpecData.roller_dia : '304.8', [Validators.required]),
    wire_dia:  new FormControl(this.mComSpecData ? this.mComSpecData.wire_dia : '1.2', [Validators.required]),
    wire_density:  new FormControl(this.mComSpecData ? this.mComSpecData.wire_density : '7850', [Validators.required]),
    wire_weight_per_length:  new FormControl(this.mComSpecData ? this.mComSpecData.wire_weight_per_length : '0.007', [Validators.required]),
    co2_gas_cost: new FormControl(this.mComSpecData ? this.mComSpecData.co2_gas_cost : '50', [Validators.required]),
    ar_co2_gas_cost:  new FormControl(this.mComSpecData ? this.mComSpecData.ar_co2_gas_cost : '100', [Validators.required]),
    wire_cost: new FormControl(this.mComSpecData ? this.mComSpecData.wire_cost : '1000', [Validators.required]),
    energy_cost:   new FormControl(this.mComSpecData ? this.mComSpecData.energy_cost : '10', [Validators.required]),
    performance:  new FormControl(this.mComSpecData ? this.mComSpecData.performance : '0.8', [Validators.required]),
    weld_efficiency:  new FormControl(this.mComSpecData ? this.mComSpecData.weld_efficiency : '0.85', [Validators.required]),
    power_efficiency:  new FormControl(this.mComSpecData ? this.mComSpecData.power_efficiency : '0.8', [Validators.required]),
    contact_tip_cost: new FormControl(this.mComSpecData ? this.mComSpecData.contact_tip_cost : '40', [Validators.required]),
    contact_tip_life:  new FormControl(this.mComSpecData ? this.mComSpecData.contact_tip_life : '20', [Validators.required]),
    nozzle_cost :  new FormControl(this.mComSpecData ? this.mComSpecData.nozzle_cost : '300', [Validators.required]),
    nozzle_life :  new FormControl(this.mComSpecData ? this.mComSpecData.nozzle_life : '200', [Validators.required]),
    orifice_cost :  new FormControl(this.mComSpecData ? this.mComSpecData.orifice_cost : '60', [Validators.required]),
    orifice_life : new FormControl(this.mComSpecData ? this.mComSpecData.orifice_life : '100', [Validators.required]),
    cleaning_gel_cost : new FormControl(this.mComSpecData ? this.mComSpecData.cleaning_gel_cost : '100', [Validators.required]),
    clean_gel_consumption : new FormControl(this.mComSpecData ? this.mComSpecData.clean_gel_consumption : '0.05', [Validators.required]),
    deleted: new FormControl(this.mComSpecData ? this.mComSpecData.deleted : false),
    });

    this.matcher = new MyErrorStateMatcher();
   }

  ngOnInit() {

  }


  update() {
    this.machineComponentSpecForm.markAllAsTouched();
    if (!this.machineComponentSpecForm.invalid) {
      console.log(this.machineComponentSpecForm);
      const spec = this.machineComponentSpecForm.value;
      this.updateMachineConmponentSpec(spec);
    } else {
      this.toaster.warning('Fill The Form Properly!!');
    }
  }

  save() {
    this.machineComponentSpecForm.markAllAsTouched();
    if (!this.machineComponentSpecForm.invalid) {
      console.log(this.machineComponentSpecForm);
      // return;
      const spec = this.machineComponentSpecForm.value;
      this.createMachineConmponentSpec(spec);
    } else {
      this.toaster.warning('Fill The Form Properly!!');
    }
  }

  createMachineConmponentSpec(spec) {
    this.spinner.show();
    this.machineService.createMachineComSpec(spec).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'COMPONENT_CREATED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Component Spec Created Successfully !!');
            console.log(response.data);
            this.router.navigate(['dashboard/home/listofspec']);
           }
        }
      }
    );
  }

  updateMachineConmponentSpec(spec) {
    this.spinner.show();
    this.machineService.updateMachineComSpec(spec).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'COMPONENT_UPDATED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Conponent Spec. Updated Successfully !!');
            console.log(response.data);
            this.router.navigate(['dashboard/home/listofspec']);
           }
        }
      }
    );
  }

  get form() { return this.machineComponentSpecForm.controls; }

  specPressEnter() {
    this.mComSpecData ? this.update() : this.save();
  }

}
