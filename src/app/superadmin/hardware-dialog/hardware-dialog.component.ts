import { Component, OnInit,Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HardwareService } from 'src/app/service/hardware.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { HardwaresComponent } from '../hardwares/hardwares.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-hardware-dialog',
  templateUrl: './hardware-dialog.component.html',
  styleUrls: ['./hardware-dialog.component.scss']
})
export class HardwareDialogComponent implements OnInit {

  hardwareForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;
  organization:any;
  currentOrg:any;
  status= ["active","inactive"];
            


  constructor(public dialogRef: MatDialogRef<HardwaresComponent>, private hardwareService: HardwareService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any) {
                console.log(parentData);
                
      this.element = parentData.element;
      this.organization = parentData.organization;
      // this.organization.forEach(element => {
      //   if( this.element!= undefined && element.orgid ==  this.element.orgid){
      //     this.currentOrg= element
      //   }
      // });

      this.currentOrg= this.element ? this.organization.find(org => org.orgid == this.element.orgid) : undefined

      console.log(this.currentOrg);

      this.hardwareForm = new FormGroup({
        hwid: new FormControl(this.element ? this.element.hwid : '', [

        ]),
        hardware_name: new FormControl(this.element ? this.element.hardware_name : '', [
          Validators.required
        ]),
        hardware_id: new FormControl(this.element ? this.element.hardware_id : '', [
          Validators.required
        ]),
        w_expire_date: new FormControl(this.element ? this.element.w_expire_date : '', [
          Validators.required
        ]),
        orgid: new FormControl(this.element ? this.currentOrg : '', [
          // Validators.required,
        ]),
        status:new FormControl(this.element ? this.element.status : '', [
        ])
      });

      this.matcher = new MyErrorStateMatcher();

      console.log(this.hardwareForm);
      
    }

  ngOnInit(): void {
    // console.log(this.status);
  }

  get form() { return this.hardwareForm.controls; }

  save() {
    
    console.log(this.hardwareForm);
    this.hardwareForm.markAllAsTouched();
    if (!this.hardwareForm.invalid) {
      console.log(this.hardwareForm);
      this.spinner.show();
      console.log(this.hardwareForm);
      
      this.hardwareForm.patchValue({        //required to patch only the orgid not the object
        "orgid":this.hardwareForm.value.orgid.orgid, 
        });   
      const hardwareValue = this.hardwareForm.value;
      console.log(hardwareValue);
      // return;
      this.hardwareService.createHardware(hardwareValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'HARDWARE_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Hardware Created Successfully !!');
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
    this.hardwareForm.markAllAsTouched();
    if (!this.hardwareForm.invalid) {
      this.spinner.show();

      this.hardwareForm.patchValue({        //required to patch only the orgid not the object
        "orgid":this.hardwareForm.value.orgid.orgid, 
        });   
      const hardwareValue = this.hardwareForm.value;
      console.log(hardwareValue);
      this.hardwareService.updateHardware(hardwareValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'HARDWARE_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Hardware Updated Successfully !!');
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

  hwPressEnter(){
    this.element ? this.update() : this.save();
  }

}
