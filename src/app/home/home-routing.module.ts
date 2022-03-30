import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from '@src/app/home/landingpage/landingpage.component';
import { LoginComponent } from '@src/app/home/login/login.component';
import { SignupComponent } from '@src/app/home/signup/signup.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RequestResetAdminComponent } from './request-reset-admin/request-reset-admin.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';


const routes: Routes = [

  { path: '', component: LandingpageComponent, pathMatch: 'full'},
  { path: 'login', component: LoginComponent, pathMatch: 'full'},
  { path: 'adminlogin', component: AdminLoginComponent, pathMatch: 'full'},
  { path: 'signup', component: SignupComponent, pathMatch: 'full'},
  { path: 'forgotpass', component: RequestResetComponent, pathMatch: 'full'},
  { path: 'forgotpassadmin', component: RequestResetAdminComponent, pathMatch: 'full'},
  { path: 'resetpassword/:token', component: ResponseResetComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
