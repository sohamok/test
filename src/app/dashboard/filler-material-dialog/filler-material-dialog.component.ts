import { Component, OnInit, Inject  } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FillerMaterialService } from 'src/app/service/filler-material.service';
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
  selector: 'app-filler-material-dialog',
  templateUrl: './filler-material-dialog.component.html',
  styleUrls: ['./filler-material-dialog.component.scss']
})
export class FillerMaterialDialogComponent implements OnInit {
  fillerMaterialForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;

  constructor(public dialogRef: MatDialogRef<FillerMaterialDialogComponent>, private fillerMaterialService: FillerMaterialService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any) {
      this.element = parentData.element;
      this.fillerMaterialForm = new FormGroup({
        fm_id: new FormControl(this.element ? this.element.fm_id : '', [

        ]),
        refName: new FormControl(this.element ? this.element.refName : '', [
          Validators.required
        ]),
        orgid: new FormControl(this.element ? this.element.orgid : '', [

        ]),
        trade_name: new FormControl(this.element ? this.element.trade_name : '', [
          Validators.required
        ]),
        fm_group: new FormControl(this.element ? this.element.fm_group : 'Mild Steel', [
          Validators.required,
        ]),
        classification: new FormControl(this.element ? this.element.classification : 'ER70S-6', [
          Validators.required
        ]),
        wire_dia: new FormControl(this.element ? this.element.wire_dia : '1.2', [
          Validators.required,
        ]),
        wire_density: new FormControl(this.element ? this.element.wire_density : '7.85', [
          Validators.required,
        ]),
        wire_weight_per_length: new FormControl(this.element ? this.element.wire_weight_per_length : '0.007', [
          Validators.required,
        ])
      });

      this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit() {
  }

  get form() { return this.fillerMaterialForm.controls; }

  save() {
    this.fillerMaterialForm.markAllAsTouched();
    if (!this.fillerMaterialForm.invalid) {
      console.log(this.fillerMaterialForm);
      this.spinner.show();
      const fillerValue = this.fillerMaterialForm.value;
      this.fillerMaterialService.createFillerMaterial(fillerValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'FILLER_MATERIAL_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'filler material Created Successfully !!');
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
    this.fillerMaterialForm.markAllAsTouched();
    if (!this.fillerMaterialForm.invalid) {
      this.spinner.show();
      const fillerValue = this.fillerMaterialForm.value;
      console.log(fillerValue);
      this.fillerMaterialService.updateFillerMaterial(fillerValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'FILLER_MATERIAL_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'filler material Updated Successfully !!');
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

  fillerMaterialPressEnter(){
    this.element ? this.update() : this.save();
  }

}
