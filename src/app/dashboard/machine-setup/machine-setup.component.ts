import { Component, OnInit, Input, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { MachineService } from 'src/app/service/machine.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocationDialogComponent } from '@src/app/dashboard/location-dialog/location-dialog.component';
import { AuthenticationService } from 'src/app/service/authentication.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-machine-setup',
  templateUrl: './machine-setup.component.html',
  styleUrls: ['./machine-setup.component.scss']
})
export class MachineSetupComponent implements OnInit {
  machineForm: FormGroup;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  hierarchy: any;
  status: any;
  type: any;
  config: any;
  component: any;
  element: any;
  location: any;
  hardware: any;
  allHardware: any;
  currentStatus: any;
  currentType: any;
  currentHardware: any;
  decodedToken: any;


  constructor(public dialogRef: MatDialogRef<MachineSetupComponent>, private machineService: MachineService,private authService: AuthenticationService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any, private dialog: MatDialog) {
    console.log('parentdata:', parentData);
    this.hierarchy = parentData.hierarchy;
    this.status = parentData.status;
    this.type = parentData.type;
    this.config = parentData.config;
    this.component = parentData.component;
    this.hardware = parentData.hardware;
    this.element = parentData.element;
    this.location = parentData.location;
    this.allHardware = parentData.allHardware;

          
    this.currentStatus= this.element ? this.status.find(st => st.msid == this.element.msid) : undefined;
    this.currentType= this.element ? this.type.find(tp => tp.mtid == this.element.mtid) : undefined;
    this.currentHardware= this.element ? this.allHardware.find(hw => hw.hardware_id == this.element.hardware_id) : undefined;
      
    console.log(this.element);
    
      console.log(this.currentStatus);
      console.log(this.currentType);
      console.log(this.currentHardware);

    this.machineForm = new FormGroup({
      hardware_id: new FormControl(this.element?.hardware_id ? this.currentHardware.hardware_id : '', [
        Validators.required,
      ]),
      name: new FormControl(this.element ? this.element.name : '', [
        Validators.required
      ]),
      des: new FormControl(this.element ? this.element.des : '', [
        Validators.required,  
      ]),
      msid: new FormControl(this.element ? this.currentStatus : '', [
        Validators.required
      ]),
      mtid: new FormControl(this.element ? this.currentType : '', [
        Validators.required,
      ]),
      hid: new FormControl(this.element ? this.element.hid : '', [
        Validators.required
      ]),
      hierarchy: new FormControl(this.element ? this.element.hierarchy : '', [
        Validators.required
      ]),
      orgid: new FormControl(this.element ? this.element.orgid : '', [
      ]),
      mcsid: new FormControl(this.element ? this.element.mcsid : '', [
        Validators.required
      ]),
      mcid: new FormControl(this.element ? this.element.mcid : '', [
        Validators.required
      ]),
      mid: new FormControl(this.element ? this.element.mid : '', [
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
   }

  ngOnInit() {
    this.decodedToken = this.authService.getUser();
    console.log(this.decodedToken.role);
  }
  get form() { return this.machineForm.controls; }


  checkUser(){
    if(this.decodedToken.role !== 'SMARTWELD ADMIN'){
      return true;
    }
    return false
  }

  save() {
    this.machineForm.markAllAsTouched();
    if (!this.machineForm.invalid) {
      this.spinner.show();
      this.machineForm.patchValue({        //required to patch only the msid not the object
        "msid":this.machineForm.value.msid.msid, 
        }); 
      
      this.machineForm.patchValue({        //required to patch only the msid not the object
        "mtid":this.machineForm.value.mtid.mtid, 
        }); 
      console.log(this.machineForm);
      const machineValue = this.machineForm.value;
      this.machineService.createMachine(machineValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'MACHINE_AND_MACHINE_TRACKING_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Machine Created Successfully !!');
                console.log(response.data.mc);
                this.dialogRef.close();
                this.spinner.hide();
               }
            }
        }
      );
    }
  }

  update() {
    this.machineForm.markAllAsTouched();
    if (!this.machineForm.invalid) {
      // console.log(this.machineForm);
      this.spinner.show();

      this.machineForm.patchValue({        //required to patch only the msid not the object
        "msid":this.machineForm.value.msid.msid, 
        });   
      
      this.machineForm.patchValue({        //required to patch only the mtid not the object
        "mtid":this.machineForm.value.mtid.mtid, 
        }); 
      const machineValue = this.machineForm.value;
      console.log(machineValue);
      this.machineService.updateMachine(machineValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'MACHINE_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Machine Updated Successfully !!');
                console.log(response.data);
                this.dialogRef.close();
                this.spinner.hide();
               }
            }
        }
      );
    }
  }

  closeDialog(action?) {
    this.dialogRef.close({event: 'Cancel', action});
  }

  seleteLocation() {

    console.log(this.machineForm);
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '94vh',
      height: '80vh',
      data: {
        location: this.location,
        selectedHierarchyId : this.machineForm.value.hid
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      this.machineForm.markAsUntouched();
      console.log(result);
      console.log('The dialog was closed');
      result.location ? this.machineForm.patchValue({hid: result.location.hid}) : null;
      result.location ? this.machineForm.patchValue({hierarchy: result.location.name}) : null;

    });
  }

  test() {
    console.log(this.machineForm);
  }

  machinePressEnter(){
    this.element ? this.update() : this.save();
  }
}
