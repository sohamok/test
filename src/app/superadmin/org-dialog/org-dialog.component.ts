import { Component, Inject, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/service/organization.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { OrgsComponent } from '../orgs/orgs.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-org-dialog',
  templateUrl: './org-dialog.component.html',
  styleUrls: ['./org-dialog.component.scss']
})
export class OrgDialogComponent implements OnInit {
  OrganizationForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;

  constructor(public dialogRef: MatDialogRef<OrgsComponent>, private organizationService: OrganizationService, private spinner: NgxSpinnerService, private toaster: ToastrService,
    @Inject(MAT_DIALOG_DATA) public parentData: any) { 
      this.element = parentData.element;
      this.OrganizationForm = new FormGroup({
        orgid: new FormControl(this.element ? this.element.orgid : '', [

        ]),
        name: new FormControl(this.element ? this.element.name : '', [
          Validators.required
        ]),
        org_email: new FormControl(this.element ? this.element.org_email : '', [
          Validators.required
        ]),
        // org_code: new FormControl(this.element ? this.element.org_code : '', [
        //   Validators.required
        // ])
      });

      this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit(): void {
  }

  get form() { return this.OrganizationForm.controls; }

  save() {
    
    console.log(this.OrganizationForm);
    this.OrganizationForm.markAllAsTouched();
    if (!this.OrganizationForm.invalid) {
      console.log(this.OrganizationForm);
      this.spinner.show();
      const organizationValue = this.OrganizationForm.value;
      console.log(organizationValue);
      
      this.organizationService.createOrganization(organizationValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'ORG_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'organization Created Successfully !!');
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
    this.OrganizationForm.markAllAsTouched();
    if (!this.OrganizationForm.invalid) {
      this.spinner.show();
      const organizationValue = this.OrganizationForm.value;
      console.log(organizationValue);
      this.organizationService.updateOrganization(organizationValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'ORG_USER_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'organization Updated Successfully !!');
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

  orgPressEnter(){
    this.element ? this.update() : this.save();
  }

}
