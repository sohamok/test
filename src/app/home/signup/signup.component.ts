import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { from } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { SignupService } from 'src/app/service/signup.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  matcher: any;
  hide1 = true;
  hide2 = true;
  checkBoxValue: any = false;
  errorMsg: string;
  isBusy: boolean = false;

  constructor(private signupService: SignupService,private spinner : NgxSpinnerService, private toaster : ToastrService ,
    private authService: AuthenticationService, private router: Router) {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required, this.checkPassword
      ]),
      repassword: new FormControl('', [
        Validators.required
      ]),
    });

    this.matcher = new MyErrorStateMatcher();

   }

   get form() { return this.signUpForm.controls; }

  ngOnInit() {
  }

  submit() {
    this.signUpForm.markAllAsTouched();
    console.log(this.signUpForm);
    if(!this.signUpForm.invalid){
      // alert("Valid");
      this.spinner.show();
      let signupValue= this.signUpForm.value;
      console.log(signupValue);
      this.signupService.signup(signupValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.errorMsg = 'Unauthorized';
            this.spinner.hide();
            if(response.message == "ACCOUNT_ALREADY_EXIST"){
              this.spinner.hide();
              this.errorMsg = "Account Already exist";
            }
          } else if (response.message === "ACCOUNT_CREATED_SUCCESSFULLY") {
            this.spinner.hide();
            this.errorMsg = '';
            this.toaster.success("Successfull !!")
            this.router.navigate(['dashboard/home'])
          }
        }, error=>{
          console.log(error);
          if (error == 'ROLE_ADMIN_NOT_FOUND'){
            this.spinner.hide();
            console.log(error);
          } else if(error == "HASH_CREATION_FAIL"){
            this.spinner.hide();
            console.log(error);
          } else if(error == "ACCOUNT_NOT_CREATED"){
            this.spinner.hide();
            console.log(error);
          } 
          
        }
      );

    }
  }
  onPasswordCheck() {
    this.signUpForm.valueChanges.subscribe(field => {
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
    return this.signUpForm.get('password').hasError('required') ? 'Password is required (at least six characters, one uppercase letter and one number)' :
      this.signUpForm.get('password').hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

}
