import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { OrgsComponent } from './orgs/orgs.component';
import { HardwaresComponent } from './hardwares/hardwares.component';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material/material.module';
import { HardwareDialogComponent } from './hardware-dialog/hardware-dialog.component';
import { OrgDialogComponent } from './org-dialog/org-dialog.component';


@NgModule({
  declarations: [HomeComponent, NavbarComponent, OrgsComponent, HardwaresComponent, HardwareDialogComponent, OrgDialogComponent],
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    ShareModule,
    MaterialModule,
  ],
  entryComponents: [
    HardwareDialogComponent,
    OrgDialogComponent
  ]
})
export class SuperadminModule { }
