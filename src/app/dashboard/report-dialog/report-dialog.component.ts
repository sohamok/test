import { Component, OnInit, Inject  } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportService } from 'src/app/service/report.service';
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
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {
  reportForm: any;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  element: any;
  status: any;
  machine: any;




  constructor(public dialogRef: MatDialogRef<ReportDialogComponent>, private reportService: ReportService, private spinner: NgxSpinnerService, private toaster: ToastrService,
              @Inject(MAT_DIALOG_DATA) public parentData: any) {
      this.element = parentData.element;
      this.status = parentData.status;
      this.machine = parentData.machine;
      this.reportForm = new FormGroup({
        rid: new FormControl(this.element ? this.element.rid : '', [

        ]),
        mid: new FormControl(this.element ? this.element.mid : '', [
          Validators.required
        ]),
        msid: new FormControl(this.element ? this.element.msid  : '', [

        ]),
        des: new FormControl(this.element ? this.element.des : '', [
          Validators.required
        ]),
        event_time: new FormControl(this.element ? this.element.event_time : '', [
          Validators.required,
        ]),
        orgid: new FormControl(this.element ? this.element.orgid : '', [
        ]),
      });

      this.matcher = new MyErrorStateMatcher();
    }

  ngOnInit() {
  }

  get form() { return this.reportForm.controls; }

  save() {
    this.reportForm.markAllAsTouched();
    if (!this.reportForm.invalid) {
      console.log(this.reportForm);
      this.spinner.show();
      const reportValue = this.reportForm.value;
      this.reportService.createReport(reportValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'REPORT_CREATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'report Created Successfully !!');
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
    this.reportForm.markAllAsTouched();
    if (!this.reportForm.invalid) {
      this.spinner.show();
      const reportValue = this.reportForm.value;
      console.log(reportValue);
      this.reportService.updateReport(reportValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
          } else {
            if (response.message === 'REPORT_UPDATED_SUCCESSFULLY') {
                this.errorMsg = '';
                this.toaster.success('Success', 'Report Updated Successfully !!');
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

  reportPressEnter(){
    this.element ? this.update() : this.save();
  }

}
