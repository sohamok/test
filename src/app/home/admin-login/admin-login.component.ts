import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/login.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  logInAdminForm: FormGroup;
  matcher: any;
  hide = true;
  errorMsg: string;

  constructor(private loginService: LoginService, private spinner: NgxSpinnerService,private toaster : ToastrService ,private authService: AuthenticationService,
    private router: Router) {
    this.logInAdminForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });

    this.matcher = new MyErrorStateMatcher();
   }

   get form() { return this.logInAdminForm.controls; }

  ngOnInit() {
  }

  submit() {
    this.errorMsg="";
    this.logInAdminForm.markAllAsTouched();
    console.log(this.logInAdminForm);
    if (!this.logInAdminForm.invalid) {
     this.spinner.show();
      const loginValue = this.logInAdminForm.value;
      console.log(loginValue);
      this.loginService.loginAdmin(loginValue).subscribe(
        response => {
          console.log(response);
          if (!response.status || response.satus === 401) {
            this.spinner.hide();
            this.errorMsg = 'Unauthorized';
            if(response.message == "USER_AUTHENTICATION_FAIL"){
              this.spinner.hide();
              console.log(response.data);
            }
          } else if (response.message == "USER_AUTHENTICATE_SUCCESSFULLY") {
            this.errorMsg = "";
            this.toaster.success("Successfull !!")
            this.spinner.hide();
            let token = response.token;
            this.authService.saveToken(token);
            console.log(this.authService.getUser());
            let decodedToken = this.authService.getUser()
            
            console.log(this.authService.isLoggedIn());
            console.log(this.authService.isTokenExpired(token));
            // console.log(decodedToken.role == UserRole.ADMIN);
            // console.log(decodedToken.role == 'ADMIN');
            
            if(decodedToken.role === 'SUPERADMIN' ){
              this.router.navigate(['superadmindashboard/home'])
            }else{
              this.router.navigate(['dashboard/home'])
            }
           
          }
        }, error =>{
          console.log(error);
          this.spinner.hide();
          if(error =='USER_NOT_FOUND'){
            this.errorMsg = "User Not Found";
          } else if (error == 'WRONG_PASSWORD'){
            this.errorMsg = "Wrong Password";
            console.log(this.errorMsg);   
          } else if(error == "TOKEN_GENERATION_FAIL"){
            console.log(error);
          }else{
            this.errorMsg = "Internal Server Error";
          }  
        }
      );
    }
  }
}