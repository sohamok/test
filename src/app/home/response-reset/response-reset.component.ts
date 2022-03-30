import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { PasswordResetService } from 'src/app/service/password-reset.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.scss']
})
export class ResponseResetComponent implements OnInit {
  ResponseResetForm: FormGroup;
  errorMessage: string;
  resetToken: any;
  jwtHelper = new JwtHelperService();
  tokenExp: any;
  expireMsg: string;
  hide1 = true;
  hide2 = true;
  errorMsg: string;
  validToken:any;
  
  constructor(private authService: AuthenticationService,private toaster : ToastrService ,private spinner: NgxSpinnerService,private passwordResetService:PasswordResetService,private router:Router,
    private route: ActivatedRoute,) {
      this.ResponseResetForm = new FormGroup({
        password: new FormControl('', [
          Validators.required, this.checkPassword
        ]),
        repassword: new FormControl('', [
          Validators.required
        ]),
      });
  
     }
  
     get form() { return this.ResponseResetForm.controls; }

    ngOnInit(): void {
      this.spinner.show()
      this.route.params.subscribe(params => {
      this.resetToken = params.token;
      console.log(this.resetToken);
      this.tokenExp = this.authService.isTokenExpired(this.resetToken);
      console.log(this.tokenExp);
      if(this.tokenExp == true){
        this.spinner.hide()
        this.expireMsg = "the Link has expired..Please try again! "
      }else{
        // const validToken = this.jwtHelper.decodeToken(this.resetToken);
        this.validToken = this.jwtHelper.decodeToken(this.resetToken);
        console.log(this.validToken);
        this.passwordResetService.validateToken(this.validToken).subscribe(
          response => {
            this.spinner.hide()
            console.log(response);
            if(response.message == "USER_AUTHENTICATION_FAILED"){
              this.expireMsg = "Unauthorised Link!"
            }
          })
      }
    });

    // this.resetToken = this.route.snapshot.paramMap.get('token')
    // console.log(this.resetToken);
    // this.authService.isTokenExpired(this.resetToken);
    
  }

  onPasswordCheck() {
    this.ResponseResetForm.valueChanges.subscribe(field => {
      if (field.password !== field.repassword) {
        this.form.repassword.setErrors({ mismatch: true });
      } else {
        this.form.repassword.setErrors(null);
      }
    });
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
    return this.ResponseResetForm.get('password').hasError('required') ? 'Password is required (at least six characters, one uppercase letter and one number)' :
      this.ResponseResetForm.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }


  resetPassword() {
    this.ResponseResetForm.markAllAsTouched();
    if(!this.ResponseResetForm.invalid){
      this.spinner.show();
      console.log(this.validToken); 
      let resetValue= this.ResponseResetForm.value;
      console.log(resetValue);

      this.passwordResetService.resetPassword(this.validToken,resetValue).subscribe(
        response => {
          this.spinner.hide();
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
          } else if (response.message === 'PASSWORD_UPDATED_SUCCESSFULLY') {
              this.errorMsg = '';
              this.toaster.success('Success', 'Password Updated Successfully !!');
              console.log(response.data);
              this.router.navigate(['/login']);
          }
        }
      );
    }
  }
    


}
