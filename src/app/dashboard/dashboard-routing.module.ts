import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { MachineSetupComponent } from './machine-setup/machine-setup.component';
import { MachinesComponent } from './machines/machines.component';
import { UsersComponent } from './users/users.component';
import { MachineconfigurationsComponent } from './machineconfigurations/machineconfigurations.component';
import { MachineconfigDialogComponent } from './machineconfig-dialog/machineconfig-dialog.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ShieldingGasComponent } from './shielding-gas/shielding-gas.component';
import { FillerMaterialComponent } from './filler-material/filler-material.component';
import { JointDesignComponent } from './joint-design/joint-design.component';
import { WeldingSequenceComponent } from './welding-sequence/welding-sequence.component';
import { ComponentSpecificationComponent } from './component-specification/component-specification.component';
import { ComponentSpecificationDialogComponent } from './component-specification-dialog/component-specification-dialog.component';
import { WeldingMaterialComponent } from './welding-material/welding-material.component';
import { ComponentTrackingComponent } from './component-tracking/component-tracking.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { PowerbiComponent } from './powerbi/powerbi.component';
import { ShiftComponent } from './shift/shift.component';
import { ReportComponent } from './report/report.component';
import { AuthGuard } from '../core/auth-guard/auth.guard';
import { RealtimeComponent } from './realtime/realtime.component';


const routes: Routes = [
  { path: 'home', component: DashboardHomeComponent,canActivate: [AuthGuard], children: [
    { path: 'geolocation', component: GeolocationComponent, pathMatch: 'full'},
    { path: 'users', component: UsersComponent, pathMatch: 'full'},
    { path: 'shift', component: ShiftComponent, pathMatch: 'full'},
    { path: 'machines', component: MachinesComponent, pathMatch: 'full'},
    { path: 'listofconfig', component: MachineconfigurationsComponent, pathMatch: 'full'},
    { path: 'mconfig', component: MachineconfigDialogComponent, pathMatch: 'full'},
    { path: 'listofspec', component: ComponentSpecificationComponent, pathMatch: 'full'},
    { path: 'mcomspec', component: ComponentSpecificationDialogComponent, pathMatch: 'full'},
    { path: 'mcomtrack', component: ComponentTrackingComponent, pathMatch: 'full'},
    { path: 'mreport', component: ReportComponent, pathMatch: 'full'},
    { path: 'shieldinggas', component: ShieldingGasComponent, pathMatch: 'full'},
    { path: 'fillermaterial', component: FillerMaterialComponent, pathMatch: 'full'},
    { path: 'jointdesign', component: JointDesignComponent, pathMatch: 'full'},
    { path: 'weldingsequence', component: WeldingSequenceComponent, pathMatch: 'full'},
    { path: 'wmaterial', component: WeldingMaterialComponent, pathMatch: 'full'},
    { path: 'reports', component: PowerbiComponent, pathMatch: 'full'},
    { path: 'realtime', component: RealtimeComponent, pathMatch: 'full'},
    
    
  ],  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
