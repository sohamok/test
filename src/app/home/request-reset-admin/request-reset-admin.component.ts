import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from 'src/app/service/password-reset.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-request-reset-admin',
  templateUrl: './request-reset-admin.component.html',
  styleUrls: ['./request-reset-admin.component.scss']
})
export class RequestResetAdminComponent implements OnInit {
  requestResetForm: FormGroup;
  msg: string;
  successMessage: string;


  constructor(private passwordResetService: PasswordResetService,private router: Router,private spinner: NgxSpinnerService,) {
    this.requestResetForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
    });
   }

  ngOnInit(): void {
    
  }

  get form() { return this.requestResetForm.controls; }

  submit(){
    this.msg="";
    this.requestResetForm.markAllAsTouched();
    console.log(this.requestResetForm);
    if (!this.requestResetForm.invalid) {
      this.spinner.show();
       const loginValue = this.requestResetForm.value;
       console.log(loginValue);
       this.passwordResetService.sendAdminLink(loginValue).subscribe(
         response => {
          this.spinner.hide();
          console.log(response);
          if(response.message === "NO_USER_FOUND"){
            this.msg = "User name not found!"
          }else if (response.message === "USER_DETAIL") {
            this.requestResetForm.reset();
            this.msg = "Reset password link sent to your email sucessfully..If not sent,please try again";
          }
        })
    }
  }

}
