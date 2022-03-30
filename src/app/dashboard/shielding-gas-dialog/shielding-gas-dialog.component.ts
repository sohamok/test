import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShieldingGasService } from 'src/app/service/shielding-gas.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-shielding-gas-dialog',
  templateUrl: './shielding-gas-dialog.component.html',
  styleUrls: ['./shielding-gas-dialog.component.scss']
})
export class ShieldingGasDialogComponent implements OnInit {
  shieldingGasForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;

  constructor(public dialogRef: MatDialogRef<ShieldingGasDialogComponent>, private shieldingGasService: ShieldingGasService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any) {
      this.element = parentData.element;
      this.shieldingGasForm = new FormGroup({
        sg_id: new FormControl(this.element ? this.element.sg_id : '', [

        ]),
        refName: new FormControl(this.element ? this.element.refName : '', [
          Validators.required
        ]),
        orgid: new FormControl(this.element ? this.element.orgid : '', [

        ]),
        shielding_gas_name: new FormControl(this.element ? this.element.shielding_gas_name : 'Ar+Co2 (80%+20%)', [
          Validators.required
        ]),
        shielding_gas_group: new FormControl(this.element ? this.element.shielding_gas_group : 'Mixed gas', [
          Validators.required,
        ]),
        purging_gas_name: new FormControl(this.element ? this.element.purging_gas_name : 'N/A', [
          Validators.required
        ]),
        purging_gas_group: new FormControl(this.element ? this.element.purging_gas_group : 'N/A', [
          Validators.required,
        ]),
      });

      this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit() {
  }

  get form() { return this.shieldingGasForm.controls; }

  save() {
    this.shieldingGasForm.markAllAsTouched();
    if (!this.shieldingGasForm.invalid) {
      console.log(this.shieldingGasForm);
      this.spinner.show();
      const shieldingValue = this.shieldingGasForm.value;
      this.shieldingGasService.createShieldingGas(shieldingValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'SHIELDING_GAS_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Shieling Gas Created Successfully !!');
                console.log(response.data);
                this.dialogRef.close();
                this.spinner.hide();
            }
          }
        }
      );
    }
  }

  update() {
    this.shieldingGasForm.markAllAsTouched();
    if (!this.shieldingGasForm.invalid) {
      this.spinner.show();
      const shieldingValue = this.shieldingGasForm.value;
      console.log(shieldingValue);
      this.shieldingGasService.updateShieldingGas(shieldingValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'SHIELDING_GAS_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Shielding Gas Updated Successfully !!');
                console.log(response.data);
                this.dialogRef.close();
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

  shieldingGasPressEnter(){
    this.element ? this.update() : this.save();
  }
}
