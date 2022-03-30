import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { PasswordResetService } from 'src/app/service/password-reset.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  requestResetForm: FormGroup;
  msg: string;
  successMessage: string;


  constructor(private passwordResetService: PasswordResetService,private router: Router,private spinner: NgxSpinnerService,) { 
    this.requestResetForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
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
       this.passwordResetService.sendLink(loginValue).subscribe(
         response => {
          this.spinner.hide();
          console.log(response);
          if(response.message === "NO_USER_FOUND"){
            this.msg = "User email not found!"
          }else if (response.message === "USER_DETAIL") {
            this.requestResetForm.reset();
            this.msg = "Reset password link sent to your email sucessfully..If not sent,please try again";
          }
          // setTimeout(() => {
          //   this.msg = null;
          //   this.router.navigate(['/login']);
          // }, 3000);
        })
    }

//   RequestResetUser(form) {
//     console.log(form)
//     if (form.valid) {
//       this.IsvalidForm = true;
//       this.authService.requestReset(this.RequestResetForm.value).subscribe(
//         data => {
//           this.RequestResetForm.reset();
//           this.successMessage = "Reset password link send to email sucessfully.";
//           setTimeout(() => {
//             this.successMessage = null;
//             this.router.navigate(['sign-in']);
//           }, 3000);
//         },
//         err => {

//           if (err.error.message) {
//             this.errorMessage = err.error.message;
//           }
//         }
//       );
//     } else {
//       this.IsvalidForm = false;
//     }
//   }
// }
  }
}
