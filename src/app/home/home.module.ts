import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from '@src/app/home/home-routing.module';
import { LoginComponent } from '@src/app/home/login/login.component';
import { HomenavComponent } from '@src/app/home/homenav/homenav.component';
import { LandingpageComponent } from '@src/app/home/landingpage/landingpage.component';
import { ShareModule } from '@src/app/share/share.module';
import { MaterialModule } from '@src/app/material/material.module';
import { SignupComponent } from '@src/app/home/signup/signup.component';
import { RequestResetComponent } from './request-reset/request-reset.component';
import { ResponseResetComponent } from './response-reset/response-reset.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RequestResetAdminComponent } from './request-reset-admin/request-reset-admin.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    AdminLoginComponent,
    HomenavComponent,
    LandingpageComponent,
    RequestResetComponent,
    ResponseResetComponent,
    RequestResetAdminComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ShareModule,
    MaterialModule,
  ]
})
export class HomeModule { }
