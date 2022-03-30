import { Component, OnInit, Inject  } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftService } from 'src/app/service/shift.service';
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
  selector: 'app-shift-dialog',
  templateUrl: './shift-dialog.component.html',
  styleUrls: ['./shift-dialog.component.scss']
})
export class ShiftDialogComponent implements OnInit {
  ShiftForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;

  constructor(public dialogRef: MatDialogRef<ShiftDialogComponent>, private shiftService: ShiftService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any) {

    this.element = parentData.element;

    this.ShiftForm = new FormGroup({
        shid: new FormControl(this.element ? this.element.shid : '', [

        ]),
        start_tm: new FormControl(this.element ? (new Date(new Date().toISOString().split('T')[0] + 'T' + this.element.start_tm)) : '', [
          Validators.required
        ]),
        end_tm: new FormControl(this.element ? (new Date(new Date().toISOString().split('T')[0] + 'T' + this.element.end_tm)) : '', [
          Validators.required,
        ]),
        name: new FormControl(this.element ? this.element.name : '', [
          Validators.required
        ]),
        orgid: new FormControl(this.element ? this.element.orgid : '', [

        ]),

      });

    this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit() {
    console.log(this.element);
  }

  get form() { return this.ShiftForm.controls; }

  save() {
    this.ShiftForm.markAllAsTouched();
    console.log(this.ShiftForm.value);

    if (!this.ShiftForm.invalid) {
      console.log(this.ShiftForm);
      this.spinner.show();
      const shiftValue = this.ShiftForm.value;
      shiftValue.start_tm = this.ShiftForm.value.start_tm.toString().split(' ')[4];
      shiftValue.end_tm = this.ShiftForm.value.end_tm.toString().split(' ')[4];
      // console.log(this.ShiftForm.value.end.toString().split(' ')[4].substring(6, 2)+'00');
      

      console.log(shiftValue);

      this.shiftService.createShift(shiftValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'SHIFT_AND_MAPPING_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'shift Created Successfully !!');
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
    this.ShiftForm.markAllAsTouched();
    if (!this.ShiftForm.invalid) {
      this.spinner.show();
      const shiftValue = this.ShiftForm.value;
      // shiftValue.start = this.ShiftForm.value.start.toString().split(' ')[4].substr(6, 2)+'00';
      // shiftValue.end = this.ShiftForm.value.end.toString().split(' ')[4].substr(6, 2)+'00';
      shiftValue.start_tm = this.ShiftForm.value.start_tm.toString().split(' ')[4];
      shiftValue.end_tm = this.ShiftForm.value.end_tm.toString().split(' ')[4];
      console.log(shiftValue);
      this.shiftService.updateShift(shiftValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'SHIFT_AND_MAPPING_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'shift Updated Successfully !!');
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

  shiftPressEnter(){
    this.element ? this.update() : this.save();
  }

}
