import { Component, OnInit, Inject } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { LocationDialogComponent } from '@src/app/dashboard/location-dialog/location-dialog.component';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.scss']
})
export class NewuserComponent implements OnInit {

  userForm: FormGroup;
  matcher: MyErrorStateMatcher;
  hide1 = true;
  hide2 = true;
  hierarchy: any;
  role: any;
  element: any;
  errorMsg: string;
  location: any;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<NewuserComponent>, private userService: UserService, private spinner: NgxSpinnerService,
              private toaster: ToastrService, @Inject(MAT_DIALOG_DATA) public parentData: any,private dialog: MatDialog) {
    this.hierarchy = parentData.hierarchy;
    this.role = parentData.role;
    this.element = parentData.element;
    this.location = parentData.location;
    this.userForm = new FormGroup({
      name: new FormControl(this.element ? this.element.name : '', [
        Validators.required,
      ]),
      email: new FormControl(this.element ? this.element.email : '', [
        Validators.required,
        Validators.email
      ]),
      phno: new FormControl(this.element ? this.element.phno : '', [
        Validators.required
      ]),
      roleid: new FormControl(this.element ? this.element.roleid : '', [
        Validators.required,
      ]),
      hid: new FormControl(this.element ? this.element.hid : '', [
        // Validators.required
      ]),
      hierarchy: new FormControl(this.element ? this.element.hierarchy : '', [
        // Validators.required
      ]),
      orgid: new FormControl(this.element ? this.element.orgid : '', [
      ]),
      certificate_id: new FormControl(this.element ? this.element.certificate_id : '', [
        Validators.required,
      ]),
      identification_no: new FormControl(this.element ? this.element.identification_no : '', [
        Validators.required
      ]),
      password: new FormControl(this.element ? this.element.password : '', [
        Validators.required,this.checkPassword
      ]),
      repassword: new FormControl(this.element ? this.element.password : '', [
        Validators.required
      ]),
      uid: new FormControl(this.element ? this.element.uid : '', [
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
   }

  ngOnInit() {
  }
  get form() { return this.userForm.controls; }



  save() {
    this.userForm.markAllAsTouched();
    if (!this.userForm.invalid) {
      this.submitted = true;
      console.log(this.userForm);
      this.spinner.show();
      const userValue = this.userForm.value;
      this.userService.createUser(userValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.status === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'USER_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'User Created Successfully !!');
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
    this.userForm.markAllAsTouched();
    if (!this.userForm.invalid) {
      this.spinner.show();
      const userValue = this.userForm.value;
      console.log(userValue);
      this.userService.updateUser(userValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.status === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'USER_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'User Updated Successfully !!');
                console.log(response.data);
                this.dialogRef.close({event: 'Update'});
                this.spinner.hide();
               }
            }
        }
      );
    }
  }

  closeDialog(action?) {
    this.dialogRef.close({event: 'Cancel'});
  }

  checkPassword(control) {
    const enteredPassword = control.value;
    console.log(enteredPassword);

    const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    console.log((!passwordCheck.test(enteredPassword)));
    console.log((!passwordCheck.test(enteredPassword) && enteredPassword));

    return (!passwordCheck.test(enteredPassword)) ? {requirements: true} : null;
  }

  getErrorPassword() {
    return this.userForm.get('password').hasError('required') ? 'Password is required (at least six characters, one uppercase letter and one number)' :
           this.userForm.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  onPasswordCheck() {
    this.userForm.valueChanges.subscribe(field => {
      if (field.password !== field.repassword) {
        this.form.repassword.setErrors({ mismatch: true });
      } else {
        this.form.repassword.setErrors(null);
      }
    });
  }

  selectLocation() {

    console.log(this.userForm);
    const dialogRef = this.dialog.open(LocationDialogComponent, {
      width: '94vh',
      height: '80vh',
      data: {
        location: this.location,
        selectedHierarchyId : this.userForm.value.hid
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe(result => {
      this.userForm.markAsUntouched();
      console.log(result);
      console.log('The dialog was closed');
      result.location ? this.userForm.patchValue({hid: result.location.hid}) : null;
      result.location ? this.userForm.patchValue({hierarchy: result.location.name}) : null;

    });
  }

  userPressEnter(){
    this.element ? this.update() : this.save();
  }

}
