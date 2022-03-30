import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MachineService } from 'src/app/service/machine.service';
import { ToastrService } from 'ngx-toastr';




export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-threshold-setting',
  templateUrl: './threshold-setting.component.html',
  styleUrls: ['./threshold-setting.component.scss']
})
export class ThresholdSettingComponent implements OnInit {
  thresholdForm: FormGroup;
  element: any;
  matcher: MyErrorStateMatcher;
  submitted = false;
  errorMsg: string;




  constructor(public dialogRef: MatDialogRef<ThresholdSettingComponent>,@Inject(MAT_DIALOG_DATA) public parentData: any,private spinner: NgxSpinnerService,
  private toaster: ToastrService, private machineService: MachineService) { 

    this.element = parentData.element;
    console.log(this.element);
    
    this.thresholdForm = new FormGroup({
      hardware_id: new FormControl(this.element ? this.element.hardware_id : '', [

      ]),
      high_weld_volt_threshold: new FormControl(this.element ? this.element.high_weld_volt_threshold: '', [
        Validators.required
      ]),
      high_weld_cur_threshold: new FormControl(this.element ? this.element.high_weld_cur_threshold : '', [
        Validators.required
      ]),
      high_weld_gas_threshold: new FormControl(this.element ? this.element.high_weld_gas_threshold : '', [
        Validators.required
      ]),
      set_weld_volt_threshold: new FormControl(this.element ? this.element.set_weld_volt_threshold : '', [
        Validators.required,
      ]),
      set_weld_cur_threshold: new FormControl(this.element ? this.element.set_weld_cur_threshold : '', [
        Validators.required
      ]),
      set_weld_gas_threshold: new FormControl(this.element ? this.element.set_weld_gas_threshold : '', [
        Validators.required,
      ]),
      low_weld_volt_threshold: new FormControl(this.element ? this.element.low_weld_volt_threshold : '', [
        Validators.required,
      ]),
      low_weld_cur_threshold: new FormControl(this.element ? this.element.low_weld_cur_threshold : '', [
        Validators.required,
      ]),
      low_weld_gas_threshold: new FormControl(this.element ? this.element.low_weld_gas_threshold : '', [
        Validators.required,
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void {
    console.log(this.element.hardware_id);
    

  }

  get form() { return this.thresholdForm.controls; }


  update() {
    this.thresholdForm.markAllAsTouched();
    if (!this.thresholdForm.invalid) {
      this.submitted = true;
      this.spinner.show();
      const thresholdValue = this.thresholdForm.value;
      console.log(thresholdValue);
      this.machineService.updateMachineThreshold(thresholdValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'CONFIGURATION_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Machine Threshold Updated Successfully !!');
                console.log(response.data);
                this.dialogRef.close({event: 'Update'});
                this.spinner.hide();
            }
          }
        }
      );
    }
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

}
