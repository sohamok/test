import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WeldingMaterialService } from 'src/app/service/welding-material.service';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-welding-material-dialog',
  templateUrl: './welding-material-dialog.component.html',
  styleUrls: ['./welding-material-dialog.component.scss']
})
export class WeldingMaterialDialogComponent implements OnInit {

  wmForm: FormGroup;
  matcher: MyErrorStateMatcher;
  // hide1: boolean= true;
  // hide2: boolean= true;
  element: any;
  errorMsg: string;

  constructor(public dialogRef: MatDialogRef<WeldingMaterialDialogComponent>, private weldingMaterialService: WeldingMaterialService, private spinner: NgxSpinnerService,
              private toaster: ToastrService, @Inject(MAT_DIALOG_DATA) public parentData: any) {

    this.element = parentData.element;
    this.wmForm = new FormGroup({
      wm_id: new FormControl(this.element ? this.element.wm_id : ''),
      refName: new FormControl(this.element ? this.element.refName : '', [
        Validators.required,
      ]),
      grade: new FormControl(this.element ? this.element.grade : '', [
        Validators.required,
      ]),
      orgid: new FormControl(this.element ? this.element.orgid : ''),
      name: new FormControl(this.element ? this.element.name : 'Mild Steel', [
        Validators.required,
      ]),
      thickness: new FormControl(this.element ? this.element.thickness : '', [
        Validators.required
      ]),
      diameter: new FormControl(this.element ? this.element.diameter : '', [
        Validators.required,
      ]),
      material_group: new FormControl(this.element ? this.element.material_group : '', [
        Validators.required
      ]),
      standard: new FormControl(this.element ? this.element.standard : '', [
        Validators.required,
      ]),
      delivery_condition: new FormControl(this.element ? this.element.delivery_condition : '', [
        Validators.required
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
   }

  ngOnInit() {
  }
  get form() { return this.wmForm.controls; }


  save() {
    console.log(this.wmForm);
    this.wmForm.markAllAsTouched();
    if (!this.wmForm.invalid) {
      console.log(this.wmForm);
      this.spinner.show();
      const wmValue = this.wmForm.value;
      this.weldingMaterialService.createWeldingMaterial(wmValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'WELDING_MATERIAL_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Welding Material Created Successfully !!');
                console.log(response.data);
                this.dialogRef.close({event: 'Save'});
                this.spinner.hide();
               }
            }
        }
      );
    }
  }

  update() {
    this.wmForm.markAllAsTouched();
    if (!this.wmForm.invalid) {
      this.spinner.show();
      const wmValue = this.wmForm.value;
      console.log(wmValue);
      this.weldingMaterialService.updateWeldingMaterial(wmValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'WELDING_MATERIAL_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Welding Material Updated Successfully !!');
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

  weldMaterialPressEnter(){
    this.element ? this.update() : this.save();
  }

}
